'use strict';

const { properties, required } = require('../common/base');
const actions = require('../common/actions');
const getBrowseBaseSchema = require('../common/browseBase');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		...getBrowseBaseSchema(true),
		root: { const: 'Browse' },
		actions,
		source: {
			$ref: 'schemaDefinitions#/definitions/endpoint'
		}
	},
	additionalProperties: false,
	required: [...required, 'fields', 'source']
};
