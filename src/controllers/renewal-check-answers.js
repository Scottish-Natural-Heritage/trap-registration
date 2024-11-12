import axios from 'axios';
import config from '../config.js';
import {ReturnState} from './_base.js';

const renewalCheckAnswersController = async (request) => {
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
    const renewal = {
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

    // Need to set the `registrationId`.
    const newRenewalResponse = await axios.post(
      config.apiEndpoint + `/v2/registrations/${registrationId}/renew`,
      renewal
    );

    if (newRenewalResponse.data) {
      request.session.regNo = `NS-TRP-${String(newRenewalResponse.data.id).padStart(5, '0')}`;
      request.session.expiryDate = newRenewalResponse.data.expiryDate;
    } else {
      request.session.alreadyReceivedRenewal = true;
    }

    // Pass the registration id as a query param and set it into session for renewal.
    request.session.registrationIdToRenew = request.query.id;

    // Proceed to the next page.
    return ReturnState.Positive;
  } catch (error) {
    // TODO: Do something useful with this error.
    console.log('Error creating renewal: ' + error);

    // Set the API error boolean.
    request.session.confirmErrors = true;
    request.session.apiError = true;

    // Let the user know it went wrong, and to 'probably' try again?
    return ReturnState.Error;
  }
};

export {renewalCheckAnswersController as default};
