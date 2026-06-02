/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Home_Section_PlaceholderInputs */

const nl_home_section_placeholder = /** @type {(inputs: Home_Section_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vervang deze inhoud door de secties van de herbouwde homepage.`)
};

/**

* @param {Home_Section_PlaceholderInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const home_section_placeholder = /** @type {((inputs?: Home_Section_PlaceholderInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Section_PlaceholderInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_home_section_placeholder(inputs)
});