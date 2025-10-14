'use strict';

const massiveActions = require('./massiveActions');
const appearance = require('./appearance');
const rowLink = require('../customLink');
const rowCollapse = require('./rowCollapse');
const themes = require('../themes');
const getEndpointParameters = require('../endpointParameters');
const filters = require('../../browse/modules/filters');
const sortableFields = require('../../common/sortableFields');
const statusBar = require('../../common/statusBar');
const makeExportImportSchema = require('../import-export');

const PAGE_SIZES = [15, 30, 60, 100, 'none'];
const DEFAULT_PAGE_SIZE = 60;

const getBrowseBaseSchema = (isPage = false) => {
	return {
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		fields: {
			type: 'array',
			items: { $ref: 'schemaDefinitions#/definitions/browseField' },
			minItems: 1
		},
		sortEndpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		fieldSortEndpoint: { type: 'string' },
		dependencies: { $ref: 'schemaDefinitions#/definitions/dependencies' },
		autoRefresh: { $ref: 'schemaDefinitions#/definitions/autoRefresh' },
		graphs: { $ref: 'schemaDefinitions#/definitions/graphs' },
		massiveActions: massiveActions(isPage),
		endpointParameters: getEndpointParameters(isPage),
		canExport: makeExportImportSchema(),
		canImport: makeExportImportSchema(false),
		canPreview: { type: 'boolean', default: false },
		canCreate: {
			$ref: 'schemaDefinitions#/definitions/canCreate',
			default: true
		},
		canView: { type: 'boolean', default: false },
		canEdit: { type: 'boolean' },
		canRefresh: { type: 'boolean', ...(isPage ? { default: true } : {}) },
		statusBar,
		appearance,
		rowLink,
		rowCollapse,
		themes,
		filters,
		sortableFields,
		featureFlags: { $ref: 'schemaDefinitions#/definitions/featureFlags' },
		pageSize: { enum: PAGE_SIZES, default: DEFAULT_PAGE_SIZE },
		maxPreviewColumns: { type: 'number', minimum: 1 }
	};
};

module.exports = getBrowseBaseSchema;
