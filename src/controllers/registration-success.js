import {ReturnState} from './_base.js';

const registrationSuccessController = (_request) => {

  // Proceed to the next page.
  return ReturnState.Positive;
};

export {registrationSuccessController as default};
