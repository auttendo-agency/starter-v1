/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Email_LabelInputs */

const en_footer_email_label = /** @type {(inputs: Footer_Email_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`hello@example.com`)
};

/**
* | output |
* | --- |
* | "hello@example.com" |
*
* @param {Footer_Email_LabelInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const footer_email_label = /** @type {((inputs?: Footer_Email_LabelInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Email_LabelInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_footer_email_label(inputs)
});