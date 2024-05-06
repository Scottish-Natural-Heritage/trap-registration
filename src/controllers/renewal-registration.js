import {ReturnState} from './_base.js';

// Cleans input checking if its undefined and trimming white space from the text
const cleanInput = (body) => {
  return {
    renewalRegistrationNumber:
      body?.renewalRegistrationNumber === undefined ? undefined : body.renewalRegistrationNumber.trim()
  };
};

const renewalRegistrationController = (request) => {
  // The trap registration number page is where the user will enter their trap registration
  // number.
  const cleanForm = cleanInput(request.body);
  request.session.renewalRegistrationNumber = cleanForm.renewalRegistrationNumber;

  // Clear error state
  request.session.renewalRegistrationNumberError = false;
  // Check if the renewal registration number is valid and isn't empty
  if (
    request.session.renewalRegistrationNumber === undefined ||
    request.session.renewalRegistrationNumber.trim() === '' ||
    !/^\d{1,5}$/.test(request.session.renewalRegistrationNumber)
  ) {
    request.session.renewalRegistrationNumberError = true;
  }

  // Set error state
  if (request.session.renewalRegistrationNumberError) {
    return ReturnState.Error;
  }
  // Return positive state for progression

  return ReturnState.Positive;
};

export {renewalRegistrationController as default};
