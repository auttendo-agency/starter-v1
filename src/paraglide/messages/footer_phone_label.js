/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Phone_LabelInputs */

const nl_footer_phone_label = /** @type {(inputs: Footer_Phone_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`+31 00 000 0000`)
};

/**

* @param {Footer_Phone_LabelInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const footer_phone_label = /** @type {((inputs?: Footer_Phone_LabelInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Phone_LabelInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_footer_phone_label(inputs)
});