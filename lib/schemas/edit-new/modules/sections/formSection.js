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
			source: {
				$ref: 'schemaDefinitions#/definitions/endpoint'
			},
			target: {
				$ref: 'schemaDefinitions#/definitions/endpoint'
			},
			fieldsGroup
		},
		required: ['name', 'rootComponent', 'fieldsGroup', 'source', 'target'],
		additionalProperties: false
	}
};
