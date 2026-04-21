'use strict';

module.exports = {
	type: 'object',
	properties: {
		target: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
		placeholder: { type: 'string' }
	},
	required: ['target'],
	additionalProperties: false
};
