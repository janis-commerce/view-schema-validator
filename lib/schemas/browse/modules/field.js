'use strict';

const componentNames = require('./componentNames');
const components = require('./component');
const mapper = require('../../common/mapper');
const filter = require('./filter-component');

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
				component: { enum: ['Input', 'Select'] },
				type: { enum: FILTER_TYPES, default: 'equal' },
				remote: { type: 'boolean', default: false },
				componentAttributes: {
					type: 'object',
					default: {}
				}
			},
			allOf: filter,
			additionalProperties: false,
			required: ['component']
		}
	},
	allOf: components,
	additionalProperties: false,
	required: ['component', 'name', 'attributes']
};
