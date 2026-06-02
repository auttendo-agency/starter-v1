/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Home_Hero_BodyInputs */

const nl_home_hero_body = /** @type {(inputs: Home_Hero_BodyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ondersteunende paragraaf. Vervang deze hero per project.`)
};

/**

* @param {Home_Hero_BodyInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const home_hero_body = /** @type {((inputs?: Home_Hero_BodyInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Hero_BodyInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_home_hero_body(inputs)
});