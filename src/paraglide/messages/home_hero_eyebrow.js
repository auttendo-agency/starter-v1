/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Home_Hero_EyebrowInputs */

const nl_home_hero_eyebrow = /** @type {(inputs: Home_Hero_EyebrowInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bovenkop`)
};

/**

* @param {Home_Hero_EyebrowInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const home_hero_eyebrow = /** @type {((inputs?: Home_Hero_EyebrowInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Hero_EyebrowInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_home_hero_eyebrow(inputs)
});