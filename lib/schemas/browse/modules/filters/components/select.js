'use strict';

const { makeComponent } = require('../../../../utils');
const { select, multiselect } = require('../componentNames');
const options = require('./select-options');

module.exports = makeComponent({
	name: [select, multiselect],
	properties: {
		translateLabels: { type: 'boolean' },
		labelPrefix: { type: 'string' },
		options: {
			type: 'object',
			properties: {
				scope: { enum: ['remote', 'local'] }
			},
			allOf: options,
			required: ['scope']
		}
	},
	requiredProperties: ['translateLabels', 'options']
});
