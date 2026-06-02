/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Email_LabelInputs */

const nl_footer_email_label = /** @type {(inputs: Footer_Email_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`hallo@voorbeeld.nl`)
};

/**

* @param {Footer_Email_LabelInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const footer_email_label = /** @type {((inputs?: Footer_Email_LabelInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Email_LabelInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_footer_email_label(inputs)
});