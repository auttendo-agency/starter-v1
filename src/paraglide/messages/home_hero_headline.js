/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Home_Hero_HeadlineInputs */

const en_home_hero_headline = /** @type {(inputs: Home_Hero_HeadlineInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Headline goes here.`)
};

/**
* | output |
* | --- |
* | "Headline goes here." |
*
* @param {Home_Hero_HeadlineInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const home_hero_headline = /** @type {((inputs?: Home_Hero_HeadlineInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Hero_HeadlineInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_home_hero_headline(inputs)
});