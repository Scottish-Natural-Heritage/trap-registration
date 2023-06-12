import axios from 'axios';

/**
 * Find addresses by postcode.
 *
 * @param {any} config The application's configuration.
 * @param {string} postcode The postcode to find addresses by.
 * @returns {Promise<any[]>} The list of matching addresses.
 */
const findAddressesByPostcode = async (config, postcode) => {
  // Lookup the postcode in our Gazetteer API.
  const apiResponse = await axios.get(config.gazetteerApiEndpoint, {
    params: {
      postcode
    },
    headers: {
      'User-Agent': 'NatureScotGullsApplybot/1.0'
    },
    timeout: 10_000
  });

  // Grab just the json payload.
  const apiData = apiResponse.data;

  // A single string in the array rather than an array of objects indicates an
  // error where no addresses have been found.
  if (apiData.metadata.count === 0 || (apiData.results.length === 1 && typeof apiData.results[0] === 'string')) {
    throw new Error('No matching addresses found.');
  }

  // Treat the json blob as a typed response.
  const gazetteerResponse = apiData;

  // Dig out the right array from the returned json blob.
  return gazetteerResponse.results[0].address;
};

/**
 * Find addresses by UPRN number.
 *
 * @param {any} config The application's configuration.
 * @param {number} uprn The UPRN to find addresses by.
 * @returns {Promise<any[]>} The list of matching addresses.
 */
const findAddressesByUprn = async (config, uprn) => {
  // Lookup the postcode in our Gazetteer API.
  const apiResponse = await axios.get(config.gazetteerApiEndpoint, {
    params: {
      uprn
    },
    headers: {
      'User-Agent': 'NatureScotGullsApplybot/1.0'
    },
    timeout: 10_000
  });

  // Grab just the json payload.
  const apiData = apiResponse.data;

  // A single string in the array rather than an array of objects indicates an
  // error where no addresses have been found.
  if (apiData.metadata.count === 0 || (apiData.results.length === 1 && typeof apiData.results[0] === 'string')) {
    throw new Error('No matching address found.');
  }

  // Treat the json blob as a typed response.
  const gazetteerResponse = apiData;

  // Dig out the right array from the returned json blob.
  return gazetteerResponse.results[0].address;
};

/**
 * Find Full address object by UPRN number.
 *
 * @param {any} config The application's configuration.
 * @param {number} uprn The UPRN to find addresses by.
 * @returns {Promise<any[]>} The list of matching addresses.
 */
const findFullAddressesByUprn = async (config, uprn) => {
  // Lookup the postcode in our Gazetteer API.
  const apiResponse = await axios.get(config.gazetteerApiEndpoint, {
    params: {
      uprn,
      fieldset: 'all'
    },
    headers: {
      'User-Agent': 'NatureScotGullsApplybot/1.0'
    },
    timeout: 10_000
  });

  // Grab just the json payload.
  const apiData = apiResponse.data;

  // A single string in the array rather than an array of objects indicates an
  // error where no addresses have been found.
  if (apiData.metadata.count === 0 || (apiData.results.length === 1 && typeof apiData.results[0] === 'string')) {
    throw new Error('No matching address found.');
  }

  // Treat the json blob as a typed response.
  const gazetteerResponse = apiData;

  // Dig out the right array from the returned json blob.
  return gazetteerResponse.results[0].address;
};

/**
 * Make calls to our Gazetteer API.
 */
const Gazetteer = {findAddressesByPostcode, findAddressesByUprn, findFullAddressesByUprn};

export default Gazetteer;
