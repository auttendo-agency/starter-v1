/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_BrandInputs */

const nl_footer_brand = /** @type {(inputs: Footer_BrandInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Merk`)
};

/**

* @param {Footer_BrandInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const footer_brand = /** @type {((inputs?: Footer_BrandInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_BrandInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_footer_brand(inputs)
});