import utils from 'naturescot-utils';
import config from '../config.js';
import axios from '../http-request.js';
import {ReturnState} from './_base.js';

const cleanInput = (body) => {
  return {
    email: body.email === undefined ? undefined : body.email.trim()
  };
};

const renewalEmailController = async (request) => {
  // The email page is where the user will enter their email address
  const cleanForm = cleanInput(request.body);
  request.session.email = cleanForm.email;

  // Clear error state
  request.session.renewalEmailError = false;

  // Wrap error check in try/catch to catch error from validating email address.
  try {
    // Call natureScot utils to check validity of email
    request.session.renewalEmailError =
      request.session.email === undefined ? true : !utils.recipients.validateEmailAddress(request.session.email);
  } catch (error) {
    console.error({error});
    request.session.renewalEmailError = true;
    // Set error state
    return ReturnState.Error;
  }

  // We wrap the http request in a try/catch block so that we don't crash the
  // client-response if something goes wrong. They should always just get the OK
  // page anyway. We'll log the error for review later.
  try {
    await axios.post(config.apiEndpoint + '/v2/registrations/renewal-email-check', {
      params: {
        email: request.session.email,
        redirectBaseUrl: `${config.hostPrefix}${config.pathPrefix}/renewal-login?token=`
      }
    });
  } catch (error) {
    console.error({error});
  }

  // The only way out of the usage page for now is onwards, so return success and continue
  // the form
  return ReturnState.Primary;
};

export {renewalEmailController as default};
