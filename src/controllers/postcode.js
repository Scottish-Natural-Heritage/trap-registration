import utils from 'naturescot-utils';
import Gazetteer from '../utils/gazetteer.js';
import config from '../config.js';
import {ReturnState} from './_base.js';

const postcodeController = async (request) => {
  // Set the errors to false.
  request.session.postcodeError = false;
  request.session.missingPostcodeError = false;
  request.session.invalidPostcodeError = false;

  // Clean the request by trimming leading and trailing whitespace.
  const postcode = request.body.addressPostcode === undefined ? undefined : request.body.addressPostcode.trim();

  // Check for any errors.
  request.session.missingPostcodeError = postcode === undefined || postcode === null || postcode === '';
  request.session.invalidPostcodeError =
    !request.session.missingPostcodeError && !utils.postalAddress.isaRealUkPostcode(postcode);

  request.session.postcodeError = request.session.missingPostcodeError || request.session.invalidPostcodeError;

  // If we have any errors return the error state.
  if (request.session.postcodeError) {
    return ReturnState.Error;
  }

  // No errors so save the postcode the the request's session.
  request.session.addressPostcode = postcode;

  // If we make it here then make the postcode lookup call.
  try {
    const gazetteerAddresses = await Gazetteer.findAddressesByPostcode(config, postcode ?? '');

    request.session.uprnAddresses = [];

    request.session.uprnAddresses = gazetteerAddresses.map((address) => {
      return {
        value: address.uprn,
        text: address.summary_address,
        selected: address.uprn === request.session.uprn
      };
    });
  } catch (error) {
    console.log('Error finding addresses: ' + error);
    request.session.uprnAddresses = [{value: 0, text: 'No addresses found.', selected: true}];
  }

  // Proceed to the next page.
  return ReturnState.Primary;
};

export {postcodeController as default};
