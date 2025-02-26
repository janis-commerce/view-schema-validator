'use strict';

const { properties, required } = require('../common/base');
const filters = require('../browse/modules/filters');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		filters,
		sources: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					name: { type: 'string' },
					source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
					endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
				},
				required: ['name', 'source']
			}
		},
		root: { const: 'Dashboard' },
		graphs: { $ref: 'schemaDefinitions#/definitions/graphs' }
	},
	additionalProperties: false,
	required: [...required, 'graphs']
};
