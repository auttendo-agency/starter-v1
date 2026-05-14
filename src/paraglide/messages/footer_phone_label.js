/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Phone_LabelInputs */

const en_footer_phone_label = /** @type {(inputs: Footer_Phone_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`+00 00 000 0000`)
};

/**
* | output |
* | --- |
* | "+00 00 000 0000" |
*
* @param {Footer_Phone_LabelInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const footer_phone_label = /** @type {((inputs?: Footer_Phone_LabelInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Phone_LabelInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_footer_phone_label(inputs)
});