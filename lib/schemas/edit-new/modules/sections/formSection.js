'use strict';

const fieldsGroup = require('./components/fieldGroup');
const { formSection } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: formSection }
		}
	},
	then: {
		properties: {
			title: { type: 'string' },
			name: { type: 'string' },
			rootComponent: { type: 'string', const: formSection },
			sourceField: { type: 'string' },
			dependencies: { $ref: 'schemaDefinitions#/definitions/dependencies' },
			source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			target: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			targetEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
			sourceEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
			fieldsGroup,
			hideUserCreated: { type: 'boolean' },
			hideUserModified: { type: 'boolean' }
		},
		required: ['name', 'rootComponent', 'fieldsGroup'],
		additionalProperties: false
	}
};
