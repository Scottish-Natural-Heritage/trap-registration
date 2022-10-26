import Gazetteer from '../utils/gazetteer.js';
import config from '../config.js';
import {cleanNonNegativeInteger} from '../utils/form.js';
import {ReturnState} from './_base.js';

const addressController = async (request) => {
  // Grab the form as a json object.
  const formData = request.body;

  // Do we have a UPRN number? If so save it to the request's session.
  request.session.uprn = cleanNonNegativeInteger(formData.address ?? undefined);
  // If we have no UPRN set the boolean so we know where to go next.
  const invalidUprn = request.session.uprn === 0 || request.session.uprn === undefined;
  // If the visitor could not find their address in the list, or
  // they clicked the `Address not found` button, take them to the
  // manual details page.
  if (invalidUprn || request.body.addressFound === 'no') {
    // Continue to manual address page.
    return ReturnState.Negative;
  }

  try {
    // Get full address uprn
    const gazetteerAddresses = await Gazetteer.findFullAddressesByUprn(config, request.session.uprn ?? 0);

    // Build up address line 1
    const subBuildingName = gazetteerAddresses[0].sub_building_name
      ? String(gazetteerAddresses[0].sub_building_name)
      : '';
    const organisationName = gazetteerAddresses[0].rm_organisation_name
      ? String(gazetteerAddresses[0].rm_organisation_name)
      : '';
    const buildingNumber = gazetteerAddresses[0].building_number ? String(gazetteerAddresses[0].building_number) : '';
    const buildingName = gazetteerAddresses[0].building_name ? String(gazetteerAddresses[0].building_name) : '';
    const addressLine1 = `${subBuildingName} ${organisationName} ${buildingNumber} ${buildingName}`;

    // Set and save the address values back to the visitors session.
    request.session.addressLine1 = addressLine1;
    request.session.addressLine2 = gazetteerAddresses[0].street_description;
    request.session.addressTown = gazetteerAddresses[0].post_town;
    request.session.addressCounty = gazetteerAddresses[0].administrative_area;
  } catch (error) {
    console.log('Error finding address: ' + error);
  }

  // Continue onwards.
  return ReturnState.Positive;
};

export {addressController as default};
