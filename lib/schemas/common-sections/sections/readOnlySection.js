'use strict';

const fieldsGroup = require('./components/fieldGroup');
const { readOnlySection } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: readOnlySection }
		}
	},
	then: {
		properties: {
			title: { type: 'string' },
			name: { type: 'string' },
			rootComponent: { type: 'string', const: readOnlySection },
			dependencies: { $ref: 'schemaDefinitions#/definitions/dependencies' },
			fieldsGroup,
			hideUserCreated: { type: 'boolean' },
			hideUserModified: { type: 'boolean' }
		},
		required: ['name', 'rootComponent', 'fieldsGroup'],
		additionalProperties: false
	}
};
