/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Home_Section_PlaceholderInputs */

const en_home_section_placeholder = /** @type {(inputs: Home_Section_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Replace this content with the rebuilt site's homepage sections.`)
};

/**
* | output |
* | --- |
* | "Replace this content with the rebuilt site's homepage sections." |
*
* @param {Home_Section_PlaceholderInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const home_section_placeholder = /** @type {((inputs?: Home_Section_PlaceholderInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Section_PlaceholderInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_home_section_placeholder(inputs)
});