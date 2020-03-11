'use strict';

const { apiKeysSection } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: apiKeysSection }
		}
	},
	then: {
		properties: {
			title: { type: 'string' },
			name: { type: 'string' },
			rootComponent: { type: 'string', const: apiKeysSection },
			source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			createEndpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			deleteEndpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			parentIdField: { type: 'string' },
			idField: { type: 'string' }
		},
		required: [
			'name',
			'rootComponent',
			'source',
			'createEndpoint',
			'deleteEndpoint',
			'parentIdField',
			'idField'
		],
		additionalProperties: false
	}
};
