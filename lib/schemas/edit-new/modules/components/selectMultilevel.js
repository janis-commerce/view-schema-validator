'use strict';

const { makeComponent } = require('../../../utils');
const componentsNames = require('../componentNames');
const options = require('../options');

const { selectMultilevel } = componentsNames;

module.exports = makeComponent({
	name: selectMultilevel,
	properties: {
		translateLabels: { type: 'boolean' },
		maxLevel: { type: 'number' },
		parentFilterName: { type: 'string' },
		parentFilterDefaultValue: { type: ['string', 'number', 'boolean'] },
		labelPrefix: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		labelFieldName: { type: 'string' },
		canClear: { type: 'boolean' },
		options: {
			type: 'object',
			properties: {
				scope: { const: 'remote' }
			},
			allOf: options
		}
	},
	requiredProperties: ['translateLabels', 'parentFilterName']
});
