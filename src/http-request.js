// eslint-disable-next-line n/prefer-global/process
import process from 'node:process';
import axios from 'axios';
import config from './config.js';

const generalError = {
  status: 500,
  statusText: 'Internal Server Error',
  data: {
    message: 'Not implemented.'
  },
  headers: {},
  config: {},
  request: undefined
};

// This is a mock public key for testing purposes. It can be used to validate
// the 100 year long token below, but will not validate any tokens from the live
// systems. Enabling the `d` attribute will allow more tokens to be generated,
// but they will only be valid during testing and will not be validated on the
// live systems.
const publicKeyResponse = {
  status: 200,
  statusText: 'OK',
  data: {
    kty: 'EC',
    kid: '7BvWTkXGNc07dguIUaxT_m_OWutHZcEXWwvxwIYTriE',
    crv: 'P-256',
    x: 'PaWMPhM7afaymxssSMaEjQYfv7XtfJIBc0T4XCkzHYE',
    y: 'f1MbjB-eQhGcrehqmPCuelt2KIjzzJ8qJZ12TsJODbo'
    // Adding the following `d` attribute would give you the private key used to
    // sign the `counterpart100yearToken` below.
    // d: 'rRPXIJLIGL1EJ1CxUhv9WTqPU3U9xg4Wq4rtMKRkng8'
  },
  headers: {},
  config: {},
  request: undefined
};

// A created-ok response to a 'renewal' post made against a registration.
const postReturnResponse = {
  status: 201,
  statusText: 'OK',
  data: {},
  headers: {
    location: config.apiEndpoint + '/v2/registrations/-1/renewal/-1'
  },
  config: {},
  request: undefined
};

// A straight-up, OK response. Used by us for mocking 'put' calls against a
// registration's return.
const putReturnResponse = {
  status: 200,
  statusText: 'OK',
  data: {},
  headers: {},
  config: {},
  request: undefined
};

// This is unused, but is useful for building URLs for testing. As long as the
// app is started with TR_TEST=true, then this token will validate as a 100
// year long token for the trap registration number "-1".
const counterpart100yearToken =
  'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjQ3Njc2NzQ1NTgsInN1YiI6Ii0xIn0.XSHX6QB8robVaEuXVeHKbBed13uAdWvLBaNeGCYPAWWlw7Fm7bafXMPUQQE69TNc8DbjUgaRDxKvS2ju5uZziw';

// A mock Axios implementation suitable for DI into the app during testing.
const mockAxios = {
  /**
   * Mock the get method from the axios library.
   *
   * Right now this only supports getting the fake public key from above.
   *
   * @param {string} url The url to get.
   * @returns {Promise<any>} A fake response.
   */
  async get(url) {
    if (url.endsWith('/trap-registration-api/v1/public-key')) {
      return publicKeyResponse;
    }

    return generalError;
  },

  /**
   * Mock the post method from the axios library.
   *
   * This only supports posting to create a new return. Uses the hard-coded post
   * response from above so the target registration is -1 and the created return
   * is -1.
   *
   * @param {string} url The url to post to.
   * @returns {Promise<any>} A fake response.
   */
  async post(url) {
    if (url.startsWith(config.apiEndpoint + '/v2/registrations/') && url.endsWith('/renewal')) {
      return postReturnResponse;
    }

    return generalError;
  },

  /**
   * Mock the put method from the axios library.
   *
   * As long as you wave a vaguely correct url at this method, you'll get a
   * positive response.
   *
   * @param {string} url The url to put to.
   * @param {any} body Only included to match the axios API.
   * @returns {Promise<any>} A fake response.
   */
  async put(url, body) {
    if (url.startsWith(config.apiEndpoint + '/v2/registrations/') && url.includes('/renewal/')) {
      // Copy the body back to the response so the linters don't complain about
      // unused parameters.
      const response = putReturnResponse;
      response.data = body;

      return response;
    }

    return generalError;
  }
};

const httpRequest = process.env.TR_TEST ? mockAxios : axios;

export {httpRequest as default, counterpart100yearToken};
