import {ReturnState} from './_base.js';

const registrationController = (_request) => {

  // Proceed to the next page.
  return ReturnState.Positive;
};

export {registrationController as default};
