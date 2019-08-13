'use strict';

const { properties, required } = require('../common/base');
const browseBase = require('../common/browseBase');
const action = require('./modules/action');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		...browseBase,
		root: { const: 'Browse' },
		actions: {
			type: 'array',
			items: action,
			default: []
		}
	},
	additionalProperties: false,
	required: [...required, 'fields', 'actions']
};
