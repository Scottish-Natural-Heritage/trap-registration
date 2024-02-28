import {ReturnState} from './_base.js';

const applyController = (request) => {
  // Did the user tell us they have no convictions.
  if (request.body.applyFor === 'new') {
    // Then we don't have any errors. This clears any previous errors.
    request.session.convictionError = false;
    // Save the decision.
    request.session.conviction = false;
    // Follow the 'happy path'.
    return ReturnState.Positive;
  }

  // Did the user tell us they're have some convictions.
  if (request.body.applyFor === 'renewal') {
    // It's a silly answer, but not an error. This clears any previous errors.
    request.session.convictionError = false;
    // Save the decision.
    request.session.conviction = true;
    // Go down the 'STOP' path.
    return ReturnState.Negative;
  }

  // The user submitted the form without selecting an option, this is an error!
  request.session.convictionError = true;
  // Unset any saved value.
  request.session.conviction = undefined;
  // Reload the page to highlight errors.
  return ReturnState.Error;
};

export {applyController as default};
