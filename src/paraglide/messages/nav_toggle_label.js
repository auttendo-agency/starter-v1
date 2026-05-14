/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Nav_Toggle_LabelInputs */

const en_nav_toggle_label = /** @type {(inputs: Nav_Toggle_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Menu`)
};

/**
* | output |
* | --- |
* | "Menu" |
*
* @param {Nav_Toggle_LabelInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const nav_toggle_label = /** @type {((inputs?: Nav_Toggle_LabelInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_Toggle_LabelInputs, { locale?: "en" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_nav_toggle_label(inputs)
});