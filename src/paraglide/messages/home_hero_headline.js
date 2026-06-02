/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Home_Hero_HeadlineInputs */

const nl_home_hero_headline = /** @type {(inputs: Home_Hero_HeadlineInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kop komt hier.`)
};

/**

* @param {Home_Hero_HeadlineInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const home_hero_headline = /** @type {((inputs?: Home_Hero_HeadlineInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Hero_HeadlineInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_home_hero_headline(inputs)
});