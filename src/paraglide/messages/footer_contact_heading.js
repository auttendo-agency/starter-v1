/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Contact_HeadingInputs */

const en_footer_contact_heading = /** @type {(inputs: Footer_Contact_HeadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Contact`)
};

/**
* | output |
* | --- |
* | "Contact" |
*
* @param {Footer_Contact_HeadingInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const footer_contact_heading = /** @type {((inputs?: Footer_Contact_HeadingInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Contact_HeadingInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_footer_contact_heading(inputs)
});