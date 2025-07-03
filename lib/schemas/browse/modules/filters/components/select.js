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
		translateGroupLabel: { type: 'boolean' },
		imageField: { type: 'string' },
		canSelectAll: { type: 'boolean' },
		options: {
			type: 'object',
			properties: {
				groupField: { type: 'string' },
				scope: { enum: ['remote', 'local'] }
			},
			allOf: options,
			required: ['scope']
		}
	},
	requiredProperties: ['translateLabels', 'options']
});
