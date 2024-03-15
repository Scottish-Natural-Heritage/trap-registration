import {ReturnState} from './_base.js';

const renewalEmailSuccessController = (_request) => {
  // Proceed to the next page.
  return ReturnState.Positive;
};

export {renewalEmailSuccessController as default};
