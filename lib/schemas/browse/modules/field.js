'use strict';

const componentNames = require('./componentNames');
const components = require('./components');
const mapper = require('../../common/mapper');
const conditions = require('./conditions');
const filter = require('./filter');

module.exports = {
	type: 'object',
	properties: {
		component: { type: 'string', enum: Object.values(componentNames) },
		name: { type: 'string' },
		label: { type: 'string' },
		noLabel: { type: 'boolean' },
		deviceDisplay: { enum: ['desktop', 'mobile'] },
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
		filter,
		conditions
	},
	allOf: components,
	additionalProperties: false,
	required: ['component', 'name', 'attributes']
};
