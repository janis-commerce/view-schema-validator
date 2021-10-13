'use strict';

const filters = require('../browse/modules/filters');
const mapper = require('./mapper');


const graphMappingCommonProps = {
	type: 'object',
	properties: {
		title: {
			type: 'object',
			properties: {
				value: { type: 'string' },
				mapper
			},
			required: ['value'],
			additionalProperties: false
		},
		source: {
			type: 'object',
			properties: {
				field: { type: 'string' },
				mapper
			},
			required: ['field'],
			additionalProperties: false
		}
	},
	required: ['source'],
	additionalProperties: false
};

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			filters,
			component: { type: 'string' },
			name: { type: 'string' },
			title: { type: 'string' },
			translateTitle: { type: 'boolean' },
			subtitle: { type: 'string' },
			translateSubtitle: { type: 'boolean' },
			source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
			componentAttributes: { type: 'object' },
			x: { type: 'number' },
			y: { type: 'number' },
			width: { type: 'number' },
			height: {
				oneOf: [
					{ type: 'number' },
					{ const: 'auto' }
				]
			},
			label: graphMappingCommonProps,
			values: {
				type: 'array',
				items: graphMappingCommonProps,
				minItems: 1
			}
		},
		additionalProperties: false,
		required: ['component', 'source', 'name', 'x', 'y', 'width', 'height']
	},
	minItems: 1
};
