import {ReturnState} from './_base.js';

const meatBaitController = (request) => {
  // Did the user tell us they're not using meat baits.
  if (request.body.meatbait === 'no') {
    // Then we don't have any errors. This clears any previous errors.
    request.session.meatBaitError = false;
    // Save the decision.
    request.session.meatBait = false;

    // If this is a renewal go back to the renewal-check-answers page.
    if (request.session.isRenewal) {
      return ReturnState.Secondary;
    }

    // Follow the negative path (actually the same direction as positive).
    return ReturnState.Negative;
  }

  // Did the user tell us they are using meat baits.
  if (request.body.meatbait === 'yes') {
    // Then we don't have any errors. This clears any previous errors.
    request.session.meatBaitError = false;
    // Save the decision.
    request.session.meatBait = true;

    // If this is a renewal go back to the renewal-check-answers page.
    if (request.session.isRenewal) {
      return ReturnState.Secondary;
    }

    // Follow the positive path (actually the same direction as negative).
    return ReturnState.Positive;
  }

  // The user submitted the form without selecting an option, this is an error!
  request.session.meatBaitError = true;
  // Unset any saved value.
  request.session.meatBait = undefined;
  // Reload the page to highlight errors.
  return ReturnState.Error;
};

export {meatBaitController as default};
