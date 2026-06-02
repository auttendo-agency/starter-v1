/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Nav_BrandInputs */

const nl_nav_brand = /** @type {(inputs: Nav_BrandInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Merk`)
};

/**

* @param {Nav_BrandInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const nav_brand = /** @type {((inputs?: Nav_BrandInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_BrandInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_nav_brand(inputs)
});