/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Nav_BrandInputs */

const en_nav_brand = /** @type {(inputs: Nav_BrandInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Brand`)
};

/**
* | output |
* | --- |
* | "Brand" |
*
* @param {Nav_BrandInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const nav_brand = /** @type {((inputs?: Nav_BrandInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_BrandInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_nav_brand(inputs)
});