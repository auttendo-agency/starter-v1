/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Phone_HrefInputs */

const en_footer_phone_href = /** @type {(inputs: Footer_Phone_HrefInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`tel:+0000000000`)
};

/**
* | output |
* | --- |
* | "tel:+0000000000" |
*
* @param {Footer_Phone_HrefInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const footer_phone_href = /** @type {((inputs?: Footer_Phone_HrefInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Phone_HrefInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_footer_phone_href(inputs)
});