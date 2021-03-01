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
		canImport: { type: 'boolean' },
		root: { const: 'Browse' },
		actions,
		topComponents: makeTopComponents(true)
	},
	additionalProperties: false,
	required: [...required, 'fields', 'source']
};
