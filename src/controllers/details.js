import utils from 'naturescot-utils';
import validation from '../utils/validation.js';
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
    fullName: body.fullName === undefined ? undefined : body.fullName.trim(),
    phoneNumber: body.phoneNumber === undefined ? undefined : body.phoneNumber.trim(),
    emailAddress:
      body.emailAddress === undefined
        ? undefined
        : utils.formatters.stripAndRemoveObscureWhitespace(body.emailAddress.toLowerCase())
  };
};

const detailsController = (request) => {
  // Clean up the user's input before we store it in the session.
  const cleanForm = cleanInput(request.body);
  request.session.fullName = cleanForm.fullName;
  request.session.phoneNumber = cleanForm.phoneNumber;
  request.session.emailAddress = cleanForm.emailAddress;

  // Clear the general error...
  request.session.detailsError = false;
  // ...and the specific errors.
  request.session.nameError = false;
  request.session.phoneError = false;
  request.session.emailError = false;
  request.session.invalidCharsName = false;
  request.session.invalidCharsPhoneNumber = false;

  // Check if each of the fields is invalid.
  if (request.body.fullName === undefined || request.body.fullName.trim() === '') {
    request.session.nameError = true;
  }

  // The smallest, non-local, non-shortcode UK phone number is '08001111'.
  // The longest could be something like 	'+44 (01234) 567 890', but we're not
  // going to check for too much data at this time.
  if (
    request.body.phoneNumber === undefined ||
    request.body.phoneNumber.trim() === '' ||
    request.body.phoneNumber.trim().length < 8
  ) {
    request.session.phoneError = true;
  }

  if (request.body.emailAddress === undefined) {
    request.session.emailError = true;
  } else {
    try {
      utils.recipients.validateEmailAddress(request.body.emailAddress);
    } catch {
      request.session.emailError = true;
    }
  }

  // Check no forbidden characters exist in the user's details.
  request.session.invalidCharsName = validation.hasInvalidCharacters(cleanForm.fullName, validation.invalidCharacters);
  request.session.invalidCharsPhoneNumber = validation.hasInvalidCharacters(
    cleanForm.phoneNumber,
    validation.invalidCharacters
  );

  // Check that any of the fields are invalid.
  request.session.detailsError =
    request.session.nameError ||
    request.session.phoneError ||
    request.session.emailError ||
    request.session.invalidCharsName ||
    request.session.invalidCharsPhoneNumber;

  // If we've seen an error in any of the fields, our visitor needs to go back
  // and fix them.
  if (request.session.detailsError) {
    return ReturnState.Error;
  }

  // Create the display version of the visitors contact info.
  request.session.displayContact = `${request.session.phoneNumber}<br>${request.session.emailAddress}`;

  // The request passed all our validation, we've stored copies of everything we
  // need, so it's time to go on.
  return ReturnState.Primary;
};

export {detailsController as default};
