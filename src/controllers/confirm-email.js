import {cleanRadioBoolean, cleanInputString} from '../utils/form.js';
import validationUtils from '../utils/validation.js';
import {ReturnState} from './_base.js';

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
  // Clear the general error...
  request.session.emailConfirmError = false;
  // Clear the specific errors too
  request.session.missingConfirmEmailSelection = false;
  request.session.missingConfirmEmailAddressValue = false;
  request.session.invalidEmailAddressValue = false;

  // If the user chooses to update the email address or not.
  const isEmailCorrect = cleanRadioBoolean(request.body.emailValidation ?? undefined);

  // The users text input if they chose to update the email address.
  const emailChange = cleanInputString(request.body.emailChange ?? undefined);

  request.session.isEmailCorrect = isEmailCorrect;
  request.session.changedEmailAddress = isEmailCorrect ? undefined : emailChange;

  const hasErrors = confirmEmailErrorChecker(request);

  if (hasErrors) {
    return ReturnState.Error;
  }

  if (!isEmailCorrect && isEmailCorrect !== undefined) {
    request.session.emailAddress = emailChange;
  }

  // If this is a renewal go back to check-answers page.
  if (request.session.isRenewal) {
    return ReturnState.Secondary
  }

  // The request passed all our validation, we've stored copies of everything we
  // need, so it's time to go on.
  return ReturnState.Positive;
};

export {confirmEmailController as default};
