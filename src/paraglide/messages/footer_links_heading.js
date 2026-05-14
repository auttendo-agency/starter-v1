/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Links_HeadingInputs */

const en_footer_links_heading = /** @type {(inputs: Footer_Links_HeadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Links`)
};

/**
* | output |
* | --- |
* | "Links" |
*
* @param {Footer_Links_HeadingInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const footer_links_heading = /** @type {((inputs?: Footer_Links_HeadingInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Links_HeadingInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_footer_links_heading(inputs)
});