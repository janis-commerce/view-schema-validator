'use strict';

module.exports = {
	type: 'object',
	properties: {
		title: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		translateTitle: { type: 'boolean' },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		sourceEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
		modalSize: { $ref: 'schemaDefinitions#/definitions/modalSize' }
	},
	required: ['source'],
	additionalProperties: false
};
