import axios from '../http-request.js';
import config from '../config.js';
import {formatAddressForDisplay} from '../utils/form.js';
import {ReturnState} from './_base.js';

const getController = async (request) => {
  // We only want to pull data from the DB into the model once.
  if (!request.session.populatedModel) {
    const registrationId = request.query.id;

    try {
      // Try to get the registration details we're interested in.
      const url = `${config.apiEndpoint}/v2/registrations/${registrationId}`;
      const trapRegistration = await axios.get(url);
      const trapRegistrationData = trapRegistration.data;

      // Save the details to session.
      request.session.conviction = trapRegistrationData.convictions;
      request.session.general1 = trapRegistrationData.usingGL01;
      request.session.general2 = trapRegistrationData.usingGL02;
      request.session.meatBait = trapRegistrationData.meatBaits;
      request.session.fullName = trapRegistrationData.fullName;
      const address = {
        addressLine1: trapRegistrationData.addressLine1,
        addressLine2: trapRegistrationData.addressLine2,
        addressTown: trapRegistrationData.addressTown,
        addressCounty: trapRegistrationData.addressCounty,
        addressPostcode: trapRegistrationData.addressPostcode
      };

      request.session.displayAddress = formatAddressForDisplay(address);

      request.session.addressLine1 = trapRegistrationData.addressLine1;
      request.session.addressLine2 = trapRegistrationData.addressLine2;
      request.session.addressTown = trapRegistrationData.addressTown;
      request.session.addressCounty = trapRegistrationData.addressCounty;
      request.session.addressPostcode = trapRegistrationData.addressPostcode;
      request.session.uprn = trapRegistrationData.uprn;
      request.session.phoneNumber = trapRegistrationData.phoneNumber;
      request.session.emailAddress = trapRegistrationData.emailAddress;

      request.session.registrationId = registrationId;
      request.session.populatedModel = true;
    } catch (error) {
      console.log(`Error getting registration ${registrationId}: ` + error);
    }
  }
};

const postController = async (request) => {
  const {registrationId} = request.session;

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
      request.session.renewedRegistrationId = newRenewalResponse.data.id;
    } else {
      request.session.alreadyReceivedRenewal = true;
    }

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

const renewalCheckAnswersController = {
  get: getController,
  post: postController
};

export {renewalCheckAnswersController as default};
