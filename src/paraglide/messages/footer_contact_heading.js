/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Contact_HeadingInputs */

const nl_footer_contact_heading = /** @type {(inputs: Footer_Contact_HeadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Contact`)
};

/**

* @param {Footer_Contact_HeadingInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const footer_contact_heading = /** @type {((inputs?: Footer_Contact_HeadingInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Contact_HeadingInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_footer_contact_heading(inputs)
});