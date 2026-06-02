/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Nav_Toggle_LabelInputs */

const nl_nav_toggle_label = /** @type {(inputs: Nav_Toggle_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Menu`)
};

/**

* @param {Nav_Toggle_LabelInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const nav_toggle_label = /** @type {((inputs?: Nav_Toggle_LabelInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_Toggle_LabelInputs, { locale?: "nl" }, {}>} */ ((inputs = {}, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_nav_toggle_label(inputs)
});