'use strict';

const { properties, required } = require('../common/base');
const filters = require('../browse/modules/filters');
const makeExportImportSchema = require('../common/import-export');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		canRefresh: { type: 'boolean' },
		canExport: makeExportImportSchema(),
		canImport: makeExportImportSchema(false),
		filters
	},
	additionalProperties: false,
	required
};
