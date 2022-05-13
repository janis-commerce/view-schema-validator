'use strict';

const getEndpointParameters = require('../endpointParameters');
const makeGenericActions = require('../../common/generic-actions');

const customCallbacks = ['removeRow', 'reloadRow', 'reloadBrowse'];

module.exports = isPage => ({
	type: 'object',
	properties: {
		title: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		translateTitle: { type: 'boolean' },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		endpointParameters: getEndpointParameters(isPage),
		actions: makeGenericActions({ customCallbacks })
	},
	additionalProperties: false,
	minProperties: 1
});
