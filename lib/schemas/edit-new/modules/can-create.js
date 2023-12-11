'use strict';

const endpointParameters = {
	oneOf: [
		{
			type: 'object',
			propertyNames: { type: 'string' }
		},
		{ $ref: 'schemaDefinitions#/definitions/endpointParameters' }
	]
};

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
