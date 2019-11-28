'use strict';

const { filesSection } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: filesSection }
		}
	},
	then: {
		properties: {
			title: { type: 'string' },
			name: { type: 'string' },
			fileUploadEndpoint: {
				$ref: 'schemaDefinitions#/definitions/endpoint'
			},
			fileRelationEndpoint: {
				$ref: 'schemaDefinitions#/definitions/endpoint'
			},
			fileListEndpoint: {
				$ref: 'schemaDefinitions#/definitions/endpoint'
			},
			fileDeleteEndpoint: {
				$ref: 'schemaDefinitions#/definitions/endpoint'
			},
			filesTypes: {
				type: 'array',
				items: {
					type: 'string'
				}
			},
			rootComponent: { type: 'string', const: filesSection }
		},
		required: ['name', 'rootComponent', 'fileUploadEndpoint'],
		additionalProperties: false
	}
};
