import utils from 'naturescot-utils';
import Gazetteer from '../utils/gazetteer';
import config from '../config.js';
import {ReturnState} from './_base.js';

const postcodeController = (request) => {
  // Set the errors to false.
  request.session.postcodeError = false;
  request.session.missingPostcodeError = false;
  request.session.invalidPostcodeError = false;

  // Clean the request by trim leading and trailing whitespace.
  const postcode = body.addressPostcode === undefined ? undefined : body.addressPostcode.trim();

  // Check for any errors.
  request.session.missingPostcodeError = postcode === undefined;
  request.session.invalidPostcodeError = !utils.postalAddress.isaRealUkPostcode(postcode);

  request.session.postcodeError = request.session.missingPostcodeError || request.session.invalidPostcodeError;

  // If we have any errors return the error state.
  if (request.session.postcodeError) {
    return ReturnState.Error;
  }

  // If we make it here then make the postcode lookup call.
  try {
    const gazetteerAddresses = await Gazetteer.findAddressesByPostcode(config, model.postcode ?? '');

    request.session.uprnAddresses = gazetteerAddresses.map((address) => {
      return {
        value: address.uprn,
        text: address.summary_address,
        selected: address.uprn === model.uprn,
      };
    });
  } catch {
    request.session.uprnAddresses = [{value: 0, text: 'No addresses found.', selected: true}];
  }

  // No errors? Then proceed to the next page.
  return ReturnState.Positive;
};

export {postcodeController as default};
