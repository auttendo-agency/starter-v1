/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_BrandInputs */

const en_footer_brand = /** @type {(inputs: Footer_BrandInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Brand`)
};

/**
* | output |
* | --- |
* | "Brand" |
*
* @param {Footer_BrandInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const footer_brand = /** @type {((inputs?: Footer_BrandInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_BrandInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_footer_brand(inputs)
});