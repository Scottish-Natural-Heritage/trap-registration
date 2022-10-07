import {ReturnState} from './_base.js';

const postcodeController = (_request) => {
  // The only way out of the postcode page is onwards, so return success and begin
  // the form.
  return ReturnState.Positive;
};

export {postcodeController as default};
