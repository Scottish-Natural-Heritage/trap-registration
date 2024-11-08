import {ReturnState} from './_base.js';

const renewalCheckAnswersController = (request) => {
  // Pass the registration id as a query param and set it into session for renewal
  request.session.registrationIdToRenew = request.query.id;

  // Proceed to the next page.
  return ReturnState.Positive;
};

export {renewalCheckAnswersController as default};
