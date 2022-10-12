import {ReturnState} from './_base.js';

const manualAddressController = (_request) => {
  // The only way out of the manual address page is onwards, so return success and begin
  // the form.
  return ReturnState.Positive;
};

export {manualAddressController as default};
