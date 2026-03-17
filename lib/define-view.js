'use strict';

/**
 * Identity function that enables TypeScript type inference for view definitions.
 * Use with JSDoc: @type {import('@janiscommerce/view-schema-validator').defineView}
 *
 * @template {object} T
 * @param {T} definition - The view definition object
 * @returns {T} The same definition object, unchanged
 */
const defineView = definition => definition;

module.exports = defineView;
module.exports.defineView = defineView;
