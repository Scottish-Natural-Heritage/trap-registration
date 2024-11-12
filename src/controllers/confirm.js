import axios from 'axios';
import config from '../config.js';
import {formattedDateString} from '../utils/date-utils.js';
import {ReturnState} from './_base.js';

const confirmController = async (request) => {
  // Grab the form as a json object.
  const formData = request.body;

  // Get any data from the posted form.
  request.session.confirmDeclaration = formData.confirmDeclaration === 'yes';

  // Assume no errors at first.
  request.session.confirmErrors = false;
  request.session.missingConfirmValue = false;
  request.session.apiError = false;

  // Check the user has checked the confirmation declaration checkbox.
  request.session.missingConfirmValue = !request.session.confirmDeclaration;

  // If we have any errors return the error state.
  if (request.session.missingConfirmValue) {
    request.session.confirmErrors = true;
    return ReturnState.Error;
  }

  try {
    const newReg = {
      convictions: request.session.conviction,
      usingGL01: request.session.general1,
      usingGL02: request.session.general2,
      complyWithTerms: request.session.confirmDeclaration,
      meatBaits: request.session.meatBait,
      fullName: request.session.fullName,
      addressLine1: request.session.addressLine1,
      addressLine2: request.session.addressLine2,
      addressTown: request.session.addressTown,
      addressCounty: request.session.addressCounty,
      addressPostcode: request.session.addressPostcode,
      phoneNumber: request.session.phoneNumber,
      emailAddress: request.session.emailAddress,
      uprn: request.session.uprn,
      uuid: request.session.uuid
    };

    const newRegResponse = await axios.post(config.apiEndpoint + '/v2/registrations', newReg);

    if (newRegResponse.data) {
      request.session.regNo = `NS-TRP-${String(newRegResponse.data.id).padStart(5, '0')}`;
      request.session.expiryDate = formattedDateString(newRegResponse.data.expiryDate);
    } else {
      request.session.alreadyReceivedApplication = true;
    }

    // Let them know it all went well.
    return ReturnState.Positive;
  } catch (error) {
    // TODO: Do something useful with this error.
    console.log('Error creating registration: ' + error);

    // Set the API error boolean.
    request.session.confirmErrors = true;
    request.session.apiError = true;

    // Let the user know it went wrong, and to 'probably' try again?
    return ReturnState.Error;
  }
};

export {confirmController as default};
