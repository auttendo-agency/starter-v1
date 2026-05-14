/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Home_Hero_EyebrowInputs */

const en_home_hero_eyebrow = /** @type {(inputs: Home_Hero_EyebrowInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Eyebrow`)
};

/**
* | output |
* | --- |
* | "Eyebrow" |
*
* @param {Home_Hero_EyebrowInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const home_hero_eyebrow = /** @type {((inputs?: Home_Hero_EyebrowInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Hero_EyebrowInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_home_hero_eyebrow(inputs)
});