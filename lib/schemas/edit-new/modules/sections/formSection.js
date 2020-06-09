'use strict';

const fieldsGroup = require('./components/fieldGroup');
const { formSection } = require('../sectionsNames');
const getStaticFilters = require('../../../common/staticFilters');

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
			targetEndpointParameters: getStaticFilters(),
			sourceEndpointParameters: getStaticFilters(),
			fieldsGroup
		},
		required: ['name', 'rootComponent', 'fieldsGroup', 'source'],
		additionalProperties: false
	}
};
