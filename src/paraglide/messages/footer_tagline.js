/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_TaglineInputs */

const nl_footer_tagline = /** @type {(inputs: Footer_TaglineInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Korte tagline of omschrijving. Vervang per project.`)
};

/**

* @param {Footer_TaglineInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const footer_tagline = /** @type {((inputs?: Footer_TaglineInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_TaglineInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_footer_tagline(inputs)
});