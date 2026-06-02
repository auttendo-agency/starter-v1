/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ year: NonNullable<unknown>, brand: NonNullable<unknown> }} Footer_CopyrightInputs */

const nl_footer_copyright = /** @type {(inputs: Footer_CopyrightInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`© ${i?.year} ${i?.brand}.`)
};

/**

* @param {Footer_CopyrightInputs} inputs
* @param {{ locale?: "nl" }} options
* @returns {LocalizedString}
*/
export const footer_copyright = /** @type {((inputs: Footer_CopyrightInputs, options?: { locale?: "nl" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_CopyrightInputs, { locale?: "nl" }, {}>} */ ((inputs, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return nl_footer_copyright(inputs)
});