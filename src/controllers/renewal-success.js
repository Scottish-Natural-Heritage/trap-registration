import {ReturnState} from './_base.js';

const renewalSuccessController = (_request) => {
  // Proceed to the next page.
  return ReturnState.Positive;
};

export {renewalSuccessController as default};
