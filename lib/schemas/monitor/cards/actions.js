'use strict';

const makeActionCallbacks = require('../../common/actionCallbacks');
const makeConditions = require('../../common/conditions');

const customCallbacks = ['reloadData'];

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			icon: { type: 'string' },
			path: { type: 'string' },
			target: { type: 'string' },
			endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
			schema: {
				type: 'array',
				items: { $ref: 'schemaDefinitions#/definitions/editNewField' },
				minItems: 1
			},
			conditions: makeConditions(false, false),
			callback: makeActionCallbacks({ customCallbacks })
		},
		additionalProperties: false,
		required: ['name']
	},
	minItems: 1
};
