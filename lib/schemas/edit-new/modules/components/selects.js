'use strict';

const { makeComponent } = require('../../../utils');
const componentsNames = require('../componentNames');
const options = require('../options');

const { select, multiSelect } = componentsNames;

module.exports = makeComponent({
	name: [select, multiSelect],
	properties: {
		translateLabels: { type: 'boolean' },
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
