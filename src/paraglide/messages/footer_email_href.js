/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Email_HrefInputs */

const nl_footer_email_href = /** @type {(inputs: Footer_Email_HrefInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`mailto:hallo@voorbeeld.nl`)
};

/**

* @param {Footer_Email_HrefInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const footer_email_href = /** @type {((inputs?: Footer_Email_HrefInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Email_HrefInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_footer_email_href(inputs)
});