'use strict';

const fieldsGroup = require('./components/fieldGroup');
const { formSection } = require('../sectionsNames');
const getEndpointParameters = require('../../../common/endpointParameters');

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
			source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			target: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			targetEndpointParameters: getEndpointParameters(),
			sourceEndpointParameters: getEndpointParameters(),
			fieldsGroup
		},
		required: ['name', 'rootComponent', 'fieldsGroup', 'source'],
		additionalProperties: false
	}
};
