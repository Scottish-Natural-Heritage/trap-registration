import utils from 'naturescot-utils';
import config from '../config.js';
import axios from '../http-request.js';
import {ReturnState} from './_base.js';

const cleanInput = (body) => {
  return {
    renewalPostcode: body.renewalPostcode === undefined ? undefined : body.renewalPostcode.trim()
  };
};

const renewalPostcodeController = async (request) => {
  // The renewalPostcode page is where the user will enter their postcode
  const cleanForm = cleanInput(request.body);
  request.session.renewalPostcode = cleanForm.renewalPostcode;

  // Clear error state
  request.session.renewalPostcodeError = false;

  // Call natureScot utils to check validity of renewalPostcode
  request.session.renewalPostcodeError =
    request.session.renewalPostcode === undefined
      ? true
      : !utils.postalAddress.isaRealUkPostcode(request.session.renewalPostcode);

  // Set error state
  if (request.session.renewalPostcodeError) {
    return ReturnState.Error;
  }

  // We wrap the http request in a try/catch block so that we don't crash the
  // client-response if something goes wrong. They should always just get the OK
  // page anyway. We'll log the error for review later.
  try {
    await axios.get(`${config.apiEndpoint}/registrations/${request.session.renewalRegistrationNumber}/renewal`, {
      params: {
        renewalPostcode: request.session.renewalPostcode,
        redirectBaseUrl: `${config.hostPrefix}${config.pathPrefix}/renewal?token=`
      }
    });
  } catch (error) {
    console.error({error});
  }

  // The only way out of the usage page for now is onwards, so return success and continue
  // the form
  return ReturnState.Positive;
};

export {renewalPostcodeController as default};
