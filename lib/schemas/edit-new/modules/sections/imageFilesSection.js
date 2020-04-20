'use strict';

const { imageFilesSection } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: imageFilesSection }
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
			fileGetEndpoint: {
				$ref: 'schemaDefinitions#/definitions/endpoint'
			},
			filesTypes: {
				type: 'array',
				items: {
					type: 'string'
				}
			},
			rootComponent: { type: 'string', const: imageFilesSection }
		},
		required: ['name', 'rootComponent', 'fileUploadEndpoint', 'fileListEndpoint'],
		additionalProperties: false
	}
};
