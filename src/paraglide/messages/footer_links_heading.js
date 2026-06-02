/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_Links_HeadingInputs */

const nl_footer_links_heading = /** @type {(inputs: Footer_Links_HeadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Links`)
};

/**

* @param {Footer_Links_HeadingInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const footer_links_heading = /** @type {((inputs?: Footer_Links_HeadingInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_Links_HeadingInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_footer_links_heading(inputs)
});