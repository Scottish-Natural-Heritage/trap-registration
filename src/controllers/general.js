import {ReturnState} from './_base.js';

const generalController = (request) => {
  // The user submitted the form without selecting an option.
  if (request.body.general === undefined) {
    // This is an error!
    request.session.generalError = true;
    // Unset any saved value.
    request.session.general1 = false;
    request.session.general2 = false;
    // Reload the page to highlight errors.
    return ReturnState.Error;
  }

  // The user submitted a single value
  if (['general1', 'general2'].includes(request.body.general)) {
    // This is not an error.
    request.session.generalError = false;
    // Unset any saved value.
    request.session.general1 = false;
    request.session.general2 = false;
    // Check the submitted value.
    if (request.body.general === 'general1') {
      request.session.general1 = true;
    }

    if (request.body.general === 'general2') {
      request.session.general2 = true;
    }

    // If this is a renewal go back to the renewal-check-answers page.
    if (request.session.isRenewal) {
      return ReturnState.Secondary;
    }

    // Continue onwards.
    return ReturnState.Positive;
  }

  // The user submitted a number of values
  if (request.body.general.length > 0) {
    // Unset any saved value.
    request.session.general1 = false;
    request.session.general2 = false;
    // Check for each of the submitted values.
    if (request.body.general.includes('general1')) {
      request.session.general1 = true;
    }

    if (request.body.general.includes('general2')) {
      request.session.general2 = true;
    }

    // Make sure the user's made at least one selection.
    const atLeastOne = request.session.general1 || request.session.general2;
    if (atLeastOne) {
      // This is not an error.
      request.session.generalError = false;

      // If this is a renewal go back to the renewal-check-answers page.
      if (request.session.isRenewal) {
        return ReturnState.Secondary;
      }

      // So continue.
      return ReturnState.Positive;
    }

    // The user submitted a list of values, but they didn't match any of
    // the values we expected, this is an error!
    request.session.generalError = true;
    // Unset any saved value.
    request.session.general1 = false;
    request.session.general2 = false;
    // Reload the page to highlight errors.
    return ReturnState.Error;
  }

  // The user submitted something that doesn't make sense.
  // This is an error!
  request.session.generalError = true;
  // Unset any saved value.
  request.session.general1 = false;
  request.session.general2 = false;
  // Reload the page to highlight errors.
  return ReturnState.Error;
};

export {generalController as default};
