import {ReturnState} from './_base.js';

const addressController = (request) => {
  // Did the user tell us they have no manualAddresss.
  if (request.body.manualAddress === 'no') {
    // Then we don't have any errors. This clears any previous errors.
    request.session.manualAddressError = false;
    // Save the decision.
    request.session.manualAddress = false;
    // Follow the 'happy path'.
    return ReturnState.Positive;
  }

  // Did the user tell us they're have some manualAddress.
  if (request.body.manualAddress === 'yes') {
    // It's a silly answer, but not an error. This clears any previous errors.
    request.session.manualAddressError = false;
    // Save the decision.
    request.session.manualAddress = true;
    // Go down the 'STOP' path.
    return ReturnState.Negative;
  }

  // The user submitted the form without selecting an option, this is an error!
  request.session.manualAddressError = true;
  // Unset any saved value.
  request.session.manualAddress = undefined;
  // Reload the page to highlight errors.
  return ReturnState.Error;
};

export {addressController as default};
