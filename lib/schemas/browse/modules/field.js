'use strict';

const componentNames = require('./componentNames');
const components = require('./components');
const mapper = require('../../common/mapper');
const makeConditions = require('../../common/conditions');
const interactions = require('./interactions');
const appearance = require('./field-appearance');
const filter = require('./filter');

module.exports = {
	type: 'object',
	properties: {
		component: { type: 'string', enum: Object.values(componentNames) },
		name: { type: 'string' },
		label: { type: 'string' },
		noLabel: { type: 'boolean' },
		deviceDisplay: { enum: ['desktop', 'mobile'] },
		appearance,
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
		conditions: makeConditions(false),
		...interactions
	},
	allOf: components,
	additionalProperties: false,
	required: ['component', 'name', 'attributes']
};
