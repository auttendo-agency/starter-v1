/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footer_TaglineInputs */

const en_footer_tagline = /** @type {(inputs: Footer_TaglineInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Short tagline or description goes here. Replace per project.`)
};

/**
* | output |
* | --- |
* | "Short tagline or description goes here. Replace per project." |
*
* @param {Footer_TaglineInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const footer_tagline = /** @type {((inputs?: Footer_TaglineInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_TaglineInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_footer_tagline(inputs)
});