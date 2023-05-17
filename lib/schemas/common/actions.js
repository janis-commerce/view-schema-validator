'use strict';

const makeGenericActions = require('../common/generic-actions');

const customCallbacks = ['removeRow', 'reloadRow', 'reloadBrowse'];

module.exports = ({
	type: 'object',
	properties: {
		title: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		translateTitle: { type: 'boolean' },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		sourceEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
		modalSize: { $ref: 'schemaDefinitions#/definitions/modalSize' },
		actions: makeGenericActions({ customCallbacks })
	},
	anyOf: [
		{
			required: [
				'actions'
			]
		},
		{
			required: [
				'source', 'sourceEndpointParameters'
			]
		}
	],
	additionalProperties: false
});
