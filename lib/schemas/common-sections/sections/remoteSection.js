'use strict';

const { remoteSection } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: remoteSection }
		}
	},
	then: {
		properties: {
			name: { type: 'string' },
			rootComponent: { type: 'string', const: remoteSection },
			source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
			target: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			targetEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
			overwriteName: { type: 'boolean' },
			sourceField: { type: 'string' },
			schemaSource: {
				type: 'object',
				properties: {
					type: { type: 'string', enum: ['static', 'dynamic'] },
					endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
					endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
				},
				required: ['type', 'endpoint'],
				minProperties: 2,
				additionalProperties: false
			}
		},
		required: ['name', 'rootComponent', 'schemaSource'],
		additionalProperties: false
	}
};
