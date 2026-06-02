/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Address_Line2Inputs */

const nl_footer_address_line2 = /** @type {(inputs: Footer_Address_Line2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`0000 AA Plaats`)
};

/**

* @param {Footer_Address_Line2Inputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const footer_address_line2 = /** @type {((inputs?: Footer_Address_Line2Inputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Address_Line2Inputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_footer_address_line2(inputs)
});