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
		columnMatch: { type: 'string' },
		name: { type: 'string' },
		label: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		noLabel: { type: 'boolean' },
		translateLabel: { type: 'boolean' },
		dependency: { type: 'string' },
		deviceDisplay: { enum: ['desktop', 'mobile'] },
		showOnPreview: { type: 'boolean' },
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
