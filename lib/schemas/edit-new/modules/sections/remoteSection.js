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
			title: { type: 'string' },
			name: { type: 'string' },
			rootComponent: { type: 'string', const: remoteSection },
			source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			target: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			schemaSource: {
				type: 'object',
				properties: {
					type: { type: 'string', enum: ['static', 'dynamic'] },
					endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
					endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
				},
				additionalProperties: false
			}

		},
		required: ['name', 'rootComponent'],
		additionalProperties: false
	}
};
