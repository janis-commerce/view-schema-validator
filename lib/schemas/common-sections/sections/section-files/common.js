'use strict';

const endpoint = { $ref: 'schemaDefinitions#/definitions/endpoint' };

module.exports = (sectionName, properties = {}) => ({
	if: {
		properties: {
			rootComponent: { const: sectionName }
		}
	},
	then: {
		properties: {
			name: { type: 'string' },
			fileUploadEndpoint: endpoint,
			fileRelationEndpoint: endpoint,
			fileListEndpoint: endpoint,
			fileDeleteEndpoint: endpoint,
			fileGetEndpoint: endpoint,
			fileSortEndpoint: endpoint,
			filesTypes: {
				type: 'array',
				items: {
					type: 'string'
				}
			},
			uploadMultiplesFiles: { type: 'boolean' },
			rootComponent: { type: 'string', const: sectionName },
			...properties
		},
		required: ['name', 'rootComponent', 'fileUploadEndpoint', 'fileListEndpoint'],
		additionalProperties: false
	}
});
