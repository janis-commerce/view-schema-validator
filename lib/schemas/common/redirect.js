'use strict';

module.exports = {
	type: 'object',
	properties: {
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		endpointParameters: {
			$ref: 'schemaDefinitions#/definitions/endpointParameters'
		}
	},
	additionalProperties: false,
	required: ['source']
};
