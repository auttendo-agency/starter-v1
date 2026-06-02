/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Address_Line1Inputs */

const nl_footer_address_line1 = /** @type {(inputs: Footer_Address_Line1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Straat 1`)
};

/**

* @param {Footer_Address_Line1Inputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const footer_address_line1 = /** @type {((inputs?: Footer_Address_Line1Inputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Address_Line1Inputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_footer_address_line1(inputs)
});