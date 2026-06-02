/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Site_DescriptionInputs */

const nl_site_description = /** @type {(inputs: Site_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sitebeschrijving.`)
};

/**

* @param {Site_DescriptionInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const site_description = /** @type {((inputs?: Site_DescriptionInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Site_DescriptionInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_site_description(inputs)
});