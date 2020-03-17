'use strict';

const { makeComponent } = require('../../../utils');
const componentsNames = require('../componentNames');
const options = require('../options');

const { select, multiselect } = componentsNames;

module.exports = makeComponent({
	name: [select, multiselect],
	properties: {
		translateLabels: { type: 'boolean' },
		labelPrefix: { type: 'string' },
		labelFieldName: { type: 'string' },
		canClear: { type: 'boolean' },
		options: {
			type: 'object',
			properties: {
				scope: { enum: ['remote', 'local'] }
			},
			allOf: options
		}
	},
	requiredProperties: ['translateLabels']
});
