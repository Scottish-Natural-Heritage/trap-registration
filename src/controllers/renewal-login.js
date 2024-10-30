import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import config from '../config.js';
import axios from '../http-request.js';
import {ReturnState} from './_base.js';

/**
 * Get the TR-API's public key.
 *
 * @returns {any} JWK representation of our public key.
 */
const getPublicKey = async () => {
  const response = await axios.get(`${config.apiEndpoint}/v1/public-key`);
  return response.data;
};

/**
 * Validate the user's saved login token.
 *
 * Clears the token when it's finished, but keeps a copy of their trap reg no.
 *
 * @param {any} session Our user's session object.
 * @param {string} session.token The user's saved login token.
 * @returns {boolean} True if the token is valid, false otherwise.
 */
const validateToken = async (session) => {
  const publicKey = await getPublicKey();
  const publicKeyAsPem = jwkToPem(publicKey);

  try {
    // Attempt to validate the user's saved login token.
    const validatedToken = jwt.verify(session.token, publicKeyAsPem, {algorithms: ['ES256']});

    // Now that we've verified the token, we can save the user's registration
    // number and clear the token.
    session.loggedInRegNo = validatedToken.sub;
    session.token = '';

    // Tell the controller that the login is valid.
    return true;
  } catch (error) {
    // If anything went wrong during validation, log the error.
    console.error({error});

    // Tell the controller that the login is no good.
    return false;
  }
};

const renewalLoginController = async (request) => {
  // The login page, like the start page is where our cookie banner is placed,
  // so by progressing past this page, we know the user's seen the banner, so we
  // don't need to show it again.
  request.session.seenCookie = true;

  // First of all, check if we've already logged in.
  if (request.session.loggedInRegNo) {
    // If so, go right ahead!
    return ReturnState.Positive;
  }

  // If we're not already logged in, try to validate the supplied token.
  if (await validateToken(request.session)) {
    // If it validates, then we're golden!
    return ReturnState.Positive;
  }

  // If it doesn't validate, or we've not got a token at all, then kick back.
  return ReturnState.Negative;
};

export {renewalLoginController as default};
