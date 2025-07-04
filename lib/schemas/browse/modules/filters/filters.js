'use strict';

const componentNames = require('./componentNames');
const filterComponents = require('./components');

const stringType = { type: 'string' };

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			label: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
			component: { type: 'string', enum: Object.values(componentNames) },
			required: { type: 'boolean' },
			componentAttributes: {
				type: 'object',
				default: {}
			},
			defaultValue: {
				oneOf: [
					stringType,
					{
						type: 'array',
						items: stringType
					},
					{
						type: 'object',
						properties: {
							from: stringType,
							to: stringType
						}
					}
				]
			}
		},
		allOf: filterComponents,
		additionalProperties: false,
		required: ['component', 'name']
	},
	default: []
};
