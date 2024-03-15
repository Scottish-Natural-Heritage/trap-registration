import {ReturnState} from './_base.js';

const renewalCheckAnswersController = (_request) => {
  // Proceed to the next page.
  return ReturnState.Positive;
};

export {renewalCheckAnswersController as default};
