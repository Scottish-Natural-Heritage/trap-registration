import utils from 'naturescot-utils';
import {cleanRadioBoolean, cleanInputString} from '../utils/form.js';
import validationUtils from '../utils/validation.js';
import {ReturnState} from './_base.js';

/**
 * Clean the incoming POST request body to make it more compatible with the
 * database and its validation rules.
 *
 * @param {any} body the incoming request's body
 * @returns {any} a json object that's just got our cleaned up fields on it
 */
const cleanInput = (body) => {
  return {
    // The strings are trimmed for leading and trailing whitespace and then
    // copied across if they're in the POST body or are set to undefined if
    // they're missing.
    emailAddress:
      body.emailAddress === undefined
        ? undefined
        : utils.formatters.stripAndRemoveObscureWhitespace(body.emailAddress.toLowerCase())
  };
};

const confirmEmailErrorChecker = (request) => {
  const emailChange = cleanInputString(request.body.emailChange ?? undefined);

  const isEmailCorrect = cleanRadioBoolean(request.body.emailValidation ?? undefined);

  const missingSelection = isEmailCorrect === undefined;

  const missingEmailAddressValue = emailChange === undefined && !isEmailCorrect && !missingSelection;
  const invalidEmailAddressValue =
    !missingEmailAddressValue &&
    !validationUtils.validEmailAddress(emailChange) &&
    !isEmailCorrect &&
    !missingSelection;

  if (missingSelection || missingEmailAddressValue || invalidEmailAddressValue) {
    request.session.emailConfirmError = true;

    request.session.missingConfirmEmailSelection = missingSelection;
    request.session.missingConfirmEmailAddressValue = missingEmailAddressValue;
    request.session.invalidEmailAddressValue = invalidEmailAddressValue;

    const errors = {
      missingSelection,
      missingEmailAddressValue,
      invalidEmailAddressValue
    };

    return errors;
  }

  return undefined;
};

const confirmEmailController = (request) => {
  // Clean up the user's input before we store it in the session.
  const cleanForm = cleanInput(request.body);
  request.session.emailAddress = cleanForm.emailAddress;

  // Clear the general error...
  request.session.emailConfirmError = false;

  request.session.missingConfirmEmailSelection = false;
  request.session.missingConfirmEmailAddressValue = false;
  request.session.invalidEmailAddressValue = false;

  const isEmailCorrect = cleanRadioBoolean(request.body.emailValidation ?? undefined);
  const emailChange = cleanInputString(request.body.emailChange ?? undefined);

  request.session.isEmailCorrect = isEmailCorrect;
  request.session.changedEmailAddress = isEmailCorrect ? undefined : emailChange;

  const hasErrors = confirmEmailErrorChecker(request);

  if (hasErrors) {
    return ReturnState.Error;
  }

  // The request passed all our validation, we've stored copies of everything we
  // need, so it's time to go on.
  return ReturnState.Positive;
};

export {confirmEmailController as default};
