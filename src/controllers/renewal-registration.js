import {ReturnState} from './_base.js';

const renewalRegistrationController = (_request) => {
  // Proceed to the next page.
  return ReturnState.Positive;
};

export {renewalRegistrationController as default};
