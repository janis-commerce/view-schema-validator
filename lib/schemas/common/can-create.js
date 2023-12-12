'use strict';

const endpointParameters = { $ref: 'schemaDefinitions#/definitions/endpointParameters' };

module.exports = () => ({
	oneOf: [
		{
			type: 'object',
			properties: {
				endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
				endpointParameters
			}
		},
		{ type: 'boolean' }
	]
});
