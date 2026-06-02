/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Site_TitleInputs */

const nl_site_title = /** @type {(inputs: Site_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sitetitel`)
};

/**

* @param {Site_TitleInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const site_title = /** @type {((inputs?: Site_TitleInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Site_TitleInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_site_title(inputs)
});