/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Email_HrefInputs */

const en_footer_email_href = /** @type {(inputs: Footer_Email_HrefInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`mailto:hello@example.com`)
};

/**
* | output |
* | --- |
* | "mailto:hello@example.com" |
*
* @param {Footer_Email_HrefInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const footer_email_href = /** @type {((inputs?: Footer_Email_HrefInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Email_HrefInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_footer_email_href(inputs)
});