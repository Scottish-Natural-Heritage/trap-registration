import axios from './http-request.js';
import config from './config.js';
import {ReturnState} from './_base.js';

const renewalCheckAnswersController = async (request) => {
  // Declare errors and set to false.
  request.session.missingConfirmValue = false;
  request.session.apiError = false;

  // Did the user click the confirm checkbox?
  request.session.confirmedDeclaration = request.body.confirm === 'confirm';

  // If the user didn't click the confirm checkbox this is an error.
  request.session.missingConfirmValue = !request.session.confirmedDeclaration;

  // If we have an error return the error state to let the user know immediately.
  if (request.session.missingConfirmValue) {
    return ReturnState.Error;
  }

  // If we made it here the user has confirmed their return so get the data ready to send.
  const newRenewal = {
    name: !request.session.name,
    emailAddress: request.session.emailAddress,

  };

  // And send the renewal data to the API.
  try {
    // Allocate a new return.
    const newRenewalResponse = await axios.post(
      config.apiEndpoint + '/registrations/' + request.session.loggedInRegNo + '/renewal'
    );

    // Determine where the back-end saved it.
    const newRenewalUrl = newRenewalResponse.headers.location;

    // Post the renewal's data to the API.
    await axios.put(newRenewalUrl, newRenewal);
  } catch (error) {
    console.log('Error creating new renewal:' + error);
    request.session.apiError = true;
    return ReturnState.Error;
  }

  // Clear all data in session now it's been saved to the database.
  request.session.name = undefined;
  request.session.emailAddress = undefined;

  // All went well so proceed to success page.
  return ReturnState.Positive;
};

export {renewalCheckAnswersController as default};
