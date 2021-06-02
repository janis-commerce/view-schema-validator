'use strict';

const mapper = require('../../common/mapper');
const makeConditions = require('../../common/conditions');
const attributes = require('./attributes');
const validations = require('./validations');
const triggers = require('./triggers');
const components = require('./components');
const componentNames = require('./componentNames');

module.exports = {
	type: 'object',
	properties: {
		component: { enum: Object.values(componentNames) },
		name: { type: 'string' },
		label: { type: 'string' },
		placeholder: { type: 'string' },
		noLabel: { type: 'boolean' },
		dependency: { type: 'string' },
		attributes,
		defaultValue: {
			anyOf: [
				{ type: 'string' },
				{ type: 'boolean' },
				{ type: 'number' },
				{ type: 'object' },
				{ type: 'array' }
			]
		},
		componentAttributes: {
			type: 'object',
			default: {}
		},
		validations,
		conditions: makeConditions(),
		triggers,
		mapper
	},
	allOf: components,
	required: ['name', 'component'],
	additionalProperties: false
};
