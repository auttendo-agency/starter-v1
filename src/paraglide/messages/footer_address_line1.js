/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Address_Line1Inputs */

const en_footer_address_line1 = /** @type {(inputs: Footer_Address_Line1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Street 1`)
};

/**
* | output |
* | --- |
* | "Street 1" |
*
* @param {Footer_Address_Line1Inputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const footer_address_line1 = /** @type {((inputs?: Footer_Address_Line1Inputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Address_Line1Inputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_footer_address_line1(inputs)
});