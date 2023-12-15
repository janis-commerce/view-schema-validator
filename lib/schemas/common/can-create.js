'use strict';

module.exports = {
	oneOf: [
		{
			type: 'object',
			properties: {
				endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
				endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
			},
			additionalProperties: false,
			required: ['endpoint', 'endpointParameters']
		},
		{ type: 'boolean' }]
};
