'use strict';

const { makeComponent } = require('../../../utils');
const { checkList } = require('../componentNames');

module.exports = makeComponent({
	name: checkList,
	properties: {
		optionsSource: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		options: { type: 'array' },
		sectionField: { type: 'string' },
		groupField: { type: 'string' },
		labelField: { type: 'string' },
		valueField: { type: 'string' },
		translateSectionLabel: { type: 'boolean' },
		translateGroupLabel: { type: 'boolean' },
		translateCheckboxLabel: { type: 'boolean' }
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
				options: { type: 'array' }
			},
			required: ['optionsSource', 'options']
		}
	},
	requiredProperties: ['sectionField', 'groupField', 'labelField', 'valueField']
});
