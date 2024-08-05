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
    addressLine1: body.addressLine1 === undefined ? undefined : body.addressLine1.trim(),
    addressLine2: body.addressLine2 === undefined ? undefined : body.addressLine2.trim(),
    addressTown: body.addressTown === undefined ? undefined : body.addressTown.trim(),
    addressCounty: body.addressCounty === undefined ? undefined : body.addressCounty.trim(),
    addressPostcode: body.addressPostcode === undefined ? undefined : body.addressPostcode.trim()
  };
};

const manualAddressController = (request) => {
  // Clean up the user's input before we store it in the session.
  const cleanForm = cleanInput(request.body);
  request.session.addressLine1 = cleanForm.addressLine1;
  request.session.addressLine2 = cleanForm.addressLine2;
  request.session.addressTown = cleanForm.addressTown;
  request.session.addressCounty = cleanForm.addressCounty;
  request.session.addressPostcode = cleanForm.addressPostcode;

  // Clear the errors
  request.session.addressLine1Error = false;
  request.session.townError = false;
  request.session.countyError = false;
  request.session.postcodeError = false;
  request.session.invalidPostcodeError = false;
  request.session.invalidCharAddressLine1 = false;
  request.session.invalidCharAddressLine2 = false;
  request.session.invalidCharAddressTown = false;
  request.session.invalidCharAddressCounty = false;

  // Check if each of the fields is invalid.
  if (request.body.addressLine1 === undefined || request.body.addressLine1.trim() === '') {
    request.session.addressLine1Error = true;
  }

  if (request.body.addressTown === undefined || request.body.addressTown.trim() === '') {
    request.session.townError = true;
  }

  if (request.body.addressCounty === undefined || request.body.addressCounty.trim() === '') {
    request.session.countyError = true;
  }

  if (request.body.addressPostcode === undefined || request.body.addressPostcode.trim() === '') {
    request.session.postcodeError = true;
  }

  // Call natureScot utils to check validity of postcode
  request.session.invalidPostcodeError =
    request.body.addressPostcode === undefined
      ? true
      : !utils.postalAddress.isaRealUkPostcode(request.body.addressPostcode);

  // Check for any forbidden characters in the user's input.
  request.session.invalidCharAddressLine1 = validation.hasInvalidCharacters(
    cleanForm.addressLine1,
    validation.invalidCharacters
  );
  request.session.invalidCharAddressLine2 = validation.hasInvalidCharacters(
    cleanForm.addressLine2,
    validation.invalidCharacters
  );
  request.session.invalidCharAddressTown = validation.hasInvalidCharacters(
    cleanForm.addressTown,
    validation.invalidCharacters
  );
  request.session.invalidCharAddressCounty = validation.hasInvalidCharacters(
    cleanForm.addressCounty,
    validation.invalidCharacters
  );

  // Check that any of the fields are invalid.
  request.session.addressError =
    request.session.addressLine1Error ||
    request.session.townError ||
    request.session.countyError ||
    request.session.postcodeError ||
    request.session.invalidPostcodeError ||
    request.session.invalidCharAddressLine1 ||
    request.session.invalidCharAddressLine2 ||
    request.session.invalidCharAddressTown ||
    request.session.invalidCharAddressCounty;

  // If we've seen an error in any of the fields, our visitor needs to go back
  // and fix them.
  if (request.session.addressError) {
    return ReturnState.Error;
  }

  // Build the address array, ignoring any blank fields.
  const address = [];
  if (request.session.addressLine1 !== undefined && request.session.addressLine1.trim() !== '') {
    address.push(request.session.addressLine1);
  }

  if (request.session.addressLine2 !== undefined && request.session.addressLine2.trim() !== '') {
    address.push(request.session.addressLine2);
  }

  if (request.session.addressTown !== undefined && request.session.addressTown.trim() !== '') {
    address.push(request.session.addressTown);
  }

  if (request.session.addressCounty !== undefined && request.session.addressCounty.trim() !== '') {
    address.push(request.session.addressCounty);
  }

  if (request.session.addressPostcode !== undefined && request.session.addressPostcode.trim() !== '') {
    address.push(request.session.addressPostcode);
  }

  // Create the display versions of the visitors address.
  request.session.displayAddress = address.join('<br>');

  // The request passed all our validation, we've stored copies of everything we
  // need, so it's time to go on.
  return ReturnState.Positive;
};

export {manualAddressController as default};
