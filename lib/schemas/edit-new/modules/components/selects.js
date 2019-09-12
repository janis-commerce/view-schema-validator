'use strict';

const { makeComponent } = require('../../../utils');
const componentsNames = require('../componentNames');
const options = require('../options');

const { select, multiselect } = componentsNames;

module.exports = makeComponent({
	name: [select, multiselect],
	properties: {
		translateLabels: { type: 'boolean' },
		labelFieldName: { type: 'string' },
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
