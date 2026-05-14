/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Address_Line2Inputs */

const en_footer_address_line2 = /** @type {(inputs: Footer_Address_Line2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`0000 AA City`)
};

/**
* | output |
* | --- |
* | "0000 AA City" |
*
* @param {Footer_Address_Line2Inputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const footer_address_line2 = /** @type {((inputs?: Footer_Address_Line2Inputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Address_Line2Inputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_footer_address_line2(inputs)
});