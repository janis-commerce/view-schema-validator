'use strict';

const { makeComponent } = require('../../../utils');
const { checkList } = require('../componentNames');

module.exports = makeComponent({
	name: checkList,
	properties: {
		optionsSource: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		sectionField: { type: 'string' },
		groupField: { type: 'string' },
		labelField: { type: 'string' },
		valueField: { type: 'string' },
		translateSectionLabel: { type: 'boolean' },
		translateGroupLabel: { type: 'boolean' },
		translateCheckboxLabel: { type: 'boolean' }
	},
	requiredProperties: ['optionsSource', 'sectionField', 'groupField', 'labelField', 'valueField']
});
