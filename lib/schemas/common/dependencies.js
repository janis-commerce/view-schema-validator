'use strict';

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			targetField: { type: 'string' },
			source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
			dependencies: { $ref: 'schemaDefinitions#/definitions/dependencies' }
		},
		required: ['name', 'source', 'targetField']
	},
	minItems: 1
};
