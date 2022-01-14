'use strict';

const { makeComponent } = require('../../../../utils');
const { select, multiselect } = require('../componentNames');
const options = require('./select-options');

module.exports = makeComponent({
	name: [select, multiselect],
	properties: {
		translateLabels: { type: 'boolean' },
		labelPrefix: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		canClear: { type: 'boolean' },
		canCreate: { type: 'boolean' },
		icon: { type: 'string' },
		preloadOptions: { type: 'boolean' },
		responseProperty: { type: 'string' },
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
