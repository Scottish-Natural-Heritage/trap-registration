/**
 * Cleans and sanitises a 'yes'/'no' pair of radio buttons.
 *
 * @param {string | undefined} dirty A form field that should be 'yes',
 * 'no' or undefined as set by a pair of radio buttons.
 * @returns {boolean | undefined} True if dirty is 'yes', false if dirty is
 * 'no', undefined otherwise.
 */
const cleanRadioBoolean = (dirty) => {
  if (dirty === 'yes') {
    return true;
  }

  if (dirty === 'no') {
    return false;
  }

  return undefined;
};

/**
 * Cleans and sanitises a string form field.
 *
 * @param {string | undefined} dirty A user-entered string from an
 * incoming form.
 * @returns {string | undefined} A trimmed string, or undefined.
 */
const cleanInputString = (dirty) => {
  if (dirty !== undefined && typeof dirty === 'string' && dirty.trim() !== '') {
    return dirty.trim();
  }

  return undefined;
};

/**
 * Process a string in to either it's non-negative integer `number`
 * representation or return `undefined`.
 *
 * @param {string | undefined} dirtyValue The user's supplied integer value.
 * @returns {number | undefined} The cleaned, non-negative, integer value.
 */

const cleanNonNegativeInteger = (dirtyValue) => {
  const trimmedValue = cleanInputString(dirtyValue);
  if (trimmedValue === undefined) {
    return undefined;
  }

  // Check we're only receiving digits, not text, negative numbers or floats.
  if (!/^\d+$/.test(trimmedValue)) {
    return undefined;
  }

  // Check it does actually parse correctly.
  const valueAsNumber = Number.parseInt(trimmedValue, 10);
  if (Number.isNaN(valueAsNumber)) {
    return undefined;
  }

  // Return the fully validated integer value.
  return valueAsNumber.valueOf();
};

/**
 * Takes an object of address details and builds an HTML formatted
 * and displayable string.
 *
 * @param {address} address The address object to use to create a
 * displayable HTML formatted address.
 * @returns {string} Returns a string formatted as HTML of a given
 * address.
 */
const formatAddressForDisplay = (address) => {
  // Build the address array, ignoring any blank fields.
  const displayAddress = [];
  if (address.addressLine1 && address.addressLine1?.trim() !== '') {
    displayAddress.push(address.addressLine1);
  }

  if (address.addressLine2 && address.addressLine2?.trim() !== '') {
    displayAddress.push(address.addressLine2);
  }

  if (address.addressTown && address.addressTown?.trim() !== '') {
    displayAddress.push(address.addressTown);
  }

  if (address.addressCounty && address.addressCounty?.trim() !== '') {
    displayAddress.push(address.addressCounty);
  }

  if (address.addressPostcode && address.addressPostcode?.trim() !== '') {
    displayAddress.push(address.addressPostcode);
  }

  // Create the display versions of the visitors address and return.
  return displayAddress.join('<br>');
};

export {cleanNonNegativeInteger, cleanInputString, cleanRadioBoolean, formatAddressForDisplay};
