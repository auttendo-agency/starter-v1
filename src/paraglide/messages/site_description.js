/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Site_DescriptionInputs */

const en_site_description = /** @type {(inputs: Site_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Site description.`)
};

/**
* | output |
* | --- |
* | "Site description." |
*
* @param {Site_DescriptionInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const site_description = /** @type {((inputs?: Site_DescriptionInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Site_DescriptionInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_site_description(inputs)
});