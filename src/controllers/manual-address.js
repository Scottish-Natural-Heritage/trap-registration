import utils from 'naturescot-utils';
import {ReturnState} from './_base.js';

const manualAddressController = (request) => {
  // Clean up the user's input before we store it in the session.
  const cleanForm = cleanInput(request.body);
  request.session.addressLine1 = cleanForm.addressLine1;
  request.session.addressLine2 = cleanForm.addressLine2;
  request.session.addressTown = cleanForm.addressTown;
  request.session.addressCounty = cleanForm.addressCounty;
  request.session.addressPostcode = cleanForm.addressPostcode;

  // Clear the errors
  request.session.addressError = false;
  request.session.townError = false;
  request.session.postcodeError = false;

  // Check if each of the fields is invalid.
  if (request.body.addressLine1 === undefined || request.body.addressLine1.trim() === '') {
    request.session.addressError = true;
  }

  if (request.body.addressTown === undefined || request.body.addressTown.trim() === '') {
    request.session.townError = true;
  }

  // Call natureScot utils to check validity of postcode
  request.session.postcodeError =
    request.body.addressPostcode === undefined
      ? true
      : !utils.postalAddress.isaRealUkPostcode(request.body.addressPostcode);

  // Check that any of the fields are invalid.
  request.session.addressError || request.session.townError || request.session.postcodeError;

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

  // The only way out of the manual address page is onwards, so return success and begin
  // the form.
  return ReturnState.Positive;
};

export {manualAddressController as default};
