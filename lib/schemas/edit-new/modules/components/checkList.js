'use strict';

const { makeComponent } = require('../../../utils');
const { checkList } = require('../componentNames');

const translateTypes = {
	oneOf: [
		{ type: 'string', pattern: '^(?!views|common)[a-zA-Z]+\\.[a-zA-Z]+$' },
		{ type: 'boolean' }
	],
	default: true
};

module.exports = makeComponent({
	name: checkList,
	properties: {
		optionsSource: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		options: { type: 'array', items: { type: 'object' } },
		sectionField: { type: 'string' },
		groupField: { type: 'string' },
		labelField: { type: 'string' },
		valueField: { type: 'string' },
		translateSectionLabel: translateTypes,
		translateGroupLabel: translateTypes,
		translateCheckboxLabel: translateTypes
	},
	conditions: {
		if: {
			properties: {
				optionsSource: { const: false },
				options: { const: false }
			}
		},
		then: {
			properties: {
				optionsSource: { $ref: 'schemaDefinitions#/definitions/endpoint' },
				options: { type: 'array', items: { type: 'object' } }
			},
			required: ['optionsSource', 'options']
		}
	},
	requiredProperties: ['sectionField', 'groupField', 'labelField', 'valueField']
});
