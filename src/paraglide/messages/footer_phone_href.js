/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Phone_HrefInputs */

const nl_footer_phone_href = /** @type {(inputs: Footer_Phone_HrefInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`tel:+3100000000`)
};

/**

* @param {Footer_Phone_HrefInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const footer_phone_href = /** @type {((inputs?: Footer_Phone_HrefInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Phone_HrefInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_footer_phone_href(inputs)
});