import {recipients} from 'naturescot-utils';

/**
 * Check whether a string looks like a valid email address.
 *
 * @param {string | undefined} emailAddress User input that should hopefully look like an email address.
 * @returns {boolean} `true` if the email address looks fine, otherwise `false`.
 */
const validEmailAddress = (emailAddress) => {
  // The validateEmailAddress method is a port from GDS' python library whose
  // API returns if valid and throws if invalid. We wrap this here to return
  // true or false instead.
  try {
    recipients.validateEmailAddress(emailAddress ?? '');
    return true;
  } catch {
    return false;
  }
};

// A list of characters we do not allow the user to supply as input.
const invalidCharacters = ['<', '>', '%', '/', '#', ':', '{', '}', '[', ']', '+', '=', '|', '*', '&'];

/**
 * Checks the supplied user input against an array of forbidden
 * characters and returns true if the input contains any forbidden
 * characters or else returns false if no forbidden characters or is
 * `undefined`.
 *
 * @param {string | undefined} userInput The input to check for forbidden characters.
 * @param {string[]} invalidCharacters An array of characters that are not
 * permitted as input.
 * @returns {boolean} Returns true if the supplied string contains any
 * forbidden characters, else returns false if no forbidden characters or input
 * is `undefined`.
 */
const hasInvalidCharacters = (userInput, invalidCharacters) => {
  if (userInput) {
    for (const char of invalidCharacters) {
      if (userInput.includes(char)) {
        return true;
      }
    }
  }

  return false;
};

const validationUtils = {hasInvalidCharacters, invalidCharacters, validEmailAddress};

export default validationUtils;
