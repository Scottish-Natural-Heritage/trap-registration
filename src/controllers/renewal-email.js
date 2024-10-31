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

  console.log(request.session.email);
  // Clear error state
  request.session.renewalEmailError = false;

  // Call natureScot utils to check validity of email
  request.session.renewalEmailError =
    request.session.email === undefined ? true : !utils.recipients.validateEmailAddress(request.session.email);

  // Set error state
  if (request.session.renewalEmailError) {
    return ReturnState.Error;
  }

  // We wrap the http request in a try/catch block so that we don't crash the
  // client-response if something goes wrong. They should always just get the OK
  // page anyway. We'll log the error for review later.
  try {
    const apiURL = config.apiEndpoint + '/v2/registrations/renewal';
    console.log('api url', apiURL);
    await axios.get(apiURL, {
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
  return ReturnState.Positive;
};

export {renewalEmailController as default};
