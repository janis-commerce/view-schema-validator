'use strict';

const { properties, required } = require('../common/base');
const actions = require('../common/actions');
const getBrowseBaseSchema = require('../common/browseBase');
const makeTopComponents = require('../common/topComponents');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		...getBrowseBaseSchema(true),
		topComponents: makeTopComponents(true),
		root: { const: 'Browse' },
		actions
	},
	additionalProperties: false,
	required: [...required, 'fields', 'source']
};
