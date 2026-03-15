export * from './common';
export * from './components';
export * from './views';

/**
 * Identity function that enables TypeScript type inference for view definitions.
 *
 * @example
 * ```js
 * const { defineView } = require('@janiscommerce/view-schema-validator/lib/define-view');
 *
 * module.exports = defineView({
 *   root: 'Browse',
 *   service: 'my-service',
 *   name: 'my-view',
 *   source: {
 *     service: 'my-service',
 *     namespace: 'my-entity',
 *     method: 'list'
 *   },
 *   fields: [
 *     { name: 'id', component: 'Text' },
 *     { name: 'name', component: 'BoldText' }
 *   ]
 * });
 * ```
 */
export function defineView<T extends import('./views').ViewDefinition>(definition: T): T;
