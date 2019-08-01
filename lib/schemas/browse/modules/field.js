'use strict';

const componentNames = require('./componentNames');
const components = require('./component');
const mapper = require('../../common/mapper');
// const filter = require('./filter-component');

const FILTER_TYPES = ['equal', 'search'];

module.exports = {
	type: 'object',
	properties: {
		component: { type: 'string', enum: Object.values(componentNames) },
		name: { type: 'string' },
		label: { type: 'string' },
		noLabel: { type: 'boolean' },
		attributes: {
			type: 'object',
			properties: {
				isStatus: { type: 'boolean', default: false },
				sortable: { type: 'boolean', default: false },
				isDefaultSort: { type: 'boolean', default: false },
				initialSortDirection: {
					type: 'string',
					enum: ['desc', 'asc'],
					default: 'desc'
				}
			},
			additionalProperties: false,
			default: {}
		},
		componentAttributes: {
			type: 'object',
			default: {}
		},
		mapper,
		filter: {
			type: 'object',
			properties: {
				component: { enum: ['component filters'] },
				type: { enum: FILTER_TYPES },
				remote: { type: 'boolean' },
				componentAttributes: {
					type: 'object',
					default: {}
				}
			},
			additionalProperties: false
		}
	},
	allOf: components,
	additionalProperties: false,
	required: ['component', 'name', 'attributes']
};

/* filter: struct.optional(struct({
	component: struct.enum(filterComponentNames),
	type: struct.optional(struct.enum(FILTER_TYPES)),
	remote: 'boolean?',
	componentAttributes: 'object?'
}, {
	remote: false,
	type: 'equal'
})),
*/
