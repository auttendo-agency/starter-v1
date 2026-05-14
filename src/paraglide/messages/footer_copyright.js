/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ year: NonNullable<unknown>, brand: NonNullable<unknown> }} Footer_CopyrightInputs */

const en_footer_copyright = /** @type {(inputs: Footer_CopyrightInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`© ${i?.year} ${i?.brand}.`)
};

/**
* | output |
* | --- |
* | "© {year} {brand}." |
*
* @param {Footer_CopyrightInputs} inputs
* @param {{ locale?: "en" }} options
* @returns {LocalizedString}
*/
export const footer_copyright = /** @type {((inputs: Footer_CopyrightInputs, options?: { locale?: "en" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_CopyrightInputs, { locale?: "en" }, {}>} */ ((inputs, options = {}) => {
	experimentalStaticLocale ?? options.locale ?? getLocale()
	return en_footer_copyright(inputs)
});