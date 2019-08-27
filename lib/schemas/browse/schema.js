'use strict';

const { properties, required } = require('../common/base');
const actions = require('../common/actions');
const browseBase = require('../common/browseBase');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		...browseBase,
		root: { const: 'Browse' },
		actions
	},
	additionalProperties: false,
	required: [...required, 'fields', 'actions']
};
