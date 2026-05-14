/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Home_Hero_BodyInputs */

const en_home_hero_body = /** @type {(inputs: Home_Hero_BodyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supporting paragraph. Replace this hero per project.`)
};

/**
* | output |
* | --- |
* | "Supporting paragraph. Replace this hero per project." |
*
* @param {Home_Hero_BodyInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const home_hero_body = /** @type {((inputs?: Home_Hero_BodyInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Hero_BodyInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_home_hero_body(inputs)
});