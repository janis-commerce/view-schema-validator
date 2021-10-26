'use strict';

const { properties, required } = require('../common/base');
const actions = require('../common/actions');
const getBrowseBaseSchema = require('../common/browseBase');
const makeExportImportSchema = require('../common/browseBase/import-export');
const makeTopComponents = require('../common/topComponents');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		...getBrowseBaseSchema(true),
		canImport: makeExportImportSchema(false),
		topComponents: makeTopComponents(true),
		root: { const: 'Browse' },
		actions
	},
	additionalProperties: false,
	required: [...required, 'fields', 'source']
};
