'use strict';

const { properties, required } = require('../common/base');
const filters = require('../browse/modules/filters');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		filters,
		root: { const: 'Monitor' },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		schemaSource: {
			type: 'object',
			properties: {
				type: {
					type: 'string',
					enum: ['static', 'dynamic']
				},
				endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
				endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
			},
			required: ['type', 'endpoint'],
			minProps: 2,
			additionalProperties: false
		},
		fields: {
			type: 'array',
			items: { $ref: 'schemaDefinitions#/definitions/browseField' },
			minItems: 1
		}
	},
	additionalProperties: false,
	required: [...required]
};
