'use strict';

const getEndpointParameters = require('../endpointParameters');

module.exports = isPage => ({
	type: 'object',
	properties: {
		title: { type: 'string' },
		translateTitle: { type: 'boolean' },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		endpointParameters: getEndpointParameters(isPage)
	},
	required: ['source'],
	additionalProperties: false,
	minProps: 1
});
