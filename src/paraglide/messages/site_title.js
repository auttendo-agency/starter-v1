/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Site_TitleInputs */

const en_site_title = /** @type {(inputs: Site_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Site title`)
};

/**
* | output |
* | --- |
* | "Site title" |
*
* @param {Site_TitleInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const site_title = /** @type {((inputs?: Site_TitleInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Site_TitleInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_site_title(inputs)
});