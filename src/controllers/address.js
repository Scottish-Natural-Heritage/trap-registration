import {ReturnState} from './_base.js';

const addressController = (request) => {

  // The only way out of the address page is onwards, so return success and begin
  // the form.
  return ReturnState.Positive;
};

export {addressController as default};
