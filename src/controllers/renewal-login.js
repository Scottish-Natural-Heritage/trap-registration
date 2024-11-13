import jwt from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import config from '../config.js';
import axios from '../http-request.js';
import {monthsFromNow, yearsAgo} from '../utils/date-utils.js';

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
 * @returns {boolean | string | jwt.JwtPayload} Token if the token is valid, false otherwise.
 */
const validateToken = async (session, token) => {
  const publicKey = await getPublicKey();
  const publicKeyAsPem = jwkToPem(publicKey);

  try {
    const validatedToken = jwt.verify(token, publicKeyAsPem, {algorithms: ['ES256']});

    session.loggedInRegNo = validatedToken.sub;

    return validatedToken;
  } catch (error) {
    console.error({error});
    return false;
  }
};

const formatDateForDisplay = (date) => {
  if (!date) {
    return 'No data';
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString();
  return `${day} ${month} ${year}`;
};

const getRenewalStatus = (date, id) => {
  const renewLink = `${config.pathPrefix}/renewal-check-answers?id=${id}`;

  if (date < monthsFromNow(3) && date > yearsAgo(3)) {
    return `<a class="govuk-link" href="${renewLink}">Renew</a>`;
  }

  return 'Renewal unavailable';
};

const getController = async (request) => {
  const {session} = request;
  const {token} = request.query;

  if (!session.loggedInRegNo) {
    const validatedToken = await validateToken(request.session, token);
    session.loggedInRegNo = validatedToken.sub;
  }

  try {
    const url = `${config.apiEndpoint}/v2/registrations/${session.loggedInRegNo}?idType=email`;
    const trapRegistration = await axios.get(url);
    const trapRegistrationData = trapRegistration.data;

    // If we've come here from a back link we'll want to reload any data into the model.
    request.session.populatedModel = false;

    return {
      registrations: trapRegistrationData.map((registration) => {
        return [
          {text: `NS-TRP-${registration.id}`},
          {text: registration.addressPostcode},
          {text: formatDateForDisplay(new Date(registration.expiryDate))},
          {html: getRenewalStatus(new Date(registration.expiryDate), registration.id)}
        ];
      })
    };
  } catch (error) {
    console.error({error});
  }
};

const postController = async (_request) => {};

const renewalLoginController = {
  get: getController,
  post: postController
};

export {renewalLoginController as default};
