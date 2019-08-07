'use strict';

const mapper = require('../../common/mapper');
const attributes = require('./attributes');
const validations = require('./validations');
const components = require('./components');
const componentNames = require('./componentNames');
const validationNames = require('./validationNames');

module.exports = {
	type: 'object',
	properties: {
		component: { enum: Object.values(componentNames) },
		name: { type: 'string' },
		label: { type: 'string' },
		attributes,
		componentAttributes: {
			type: 'object',
			default: {}
		},
		validations: {
			type: 'array',
			items: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						rootComponent: { enum: validationNames }
					},
					allOf: validations
				},
				minItems: 1
			}
		},
		mapper
	},
	allOf: components,
	required: ['name', 'component'],
	additionalProperties: false
};
