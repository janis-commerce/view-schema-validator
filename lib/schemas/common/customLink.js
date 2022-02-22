'use strict';

module.exports = {
	type: 'object',
	properties: {
		path: { type: 'string' },
		endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
	},
	additionalProperties: false,
	required: ['path'],
	minProperties: 1
};
