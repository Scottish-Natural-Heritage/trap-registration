import utils from 'naturescot-utils';
import Gazetteer from '../utils/gazetteer.js';
import config from '../config.js';
import {ReturnState} from './_base.js';

const renewalPostcodeController = async (request) => {
  // Set the errors to false.
  request.session.renewalPostcodeError = false;
  request.session.missingRenewalPostcodeError = false;
  request.session.invalidRenewalPostcodeError = false;

  // Clean the request by trimming leading and trailing whitespace.
  const renewalPostcode = request.body.renewalPostcode === undefined ? undefined : request.body.renewalPostcode.trim();

  // Check for any errors.
  request.session.missingRenewalPostcodeError =
    renewalPostcode === undefined || renewalPostcode === null || renewalPostcode === '';
  request.session.invalidRenewalPostcodeError =
    !request.session.missingRenewalPostcodeError && !utils.postalAddress.isaRealUkPostcode(renewalPostcode);

  request.session.renewalPostcodeError =
    request.session.missingRenewalPostcodeError || request.session.invalidRenewalPostcodeError;

  // If we have any errors return the error state.
  if (request.session.renewalPostcodeError) {
    return ReturnState.Error;
  }

  // No errors so save the renewalPostcode the the request's session.
  request.session.renewalPostcode = renewalPostcode;

  // If we make it here then make the renewalPostcode lookup call.
  try {
    const gazetteerAddresses = await Gazetteer.findAddressesByPostcode(config, renewalPostcode ?? '');

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
  return ReturnState.Positive;
};

export {renewalPostcodeController as default};
