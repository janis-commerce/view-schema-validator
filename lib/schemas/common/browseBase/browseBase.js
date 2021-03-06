'use strict';

const massiveActions = require('./massiveActions');
const appearance = require('./appearance');
const rowLink = require('./rowLink');
const rowCollapse = require('./rowCollapse');
const themes = require('../themes');
const graphs = require('../graphs');
const getEndpointParameters = require('../endpointParameters');
const filters = require('../../browse/modules/filters');
const sortableFields = require('../../browse/modules/sortableFields');

const PAGE_SIZES = [15, 30, 60, 100];
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
		massiveActions: massiveActions(isPage),
		staticFilters: getEndpointParameters(isPage),
		endpointParameters: getEndpointParameters(isPage),
		canPreview: { type: 'boolean', default: false },
		canEdit: { type: 'boolean', default: true },
		canCreate: { type: 'boolean', default: true },
		canView: { type: 'boolean', default: false },
		canExport: { type: 'boolean', default: false },
		canRefresh: { type: 'boolean' },
		appearance,
		rowLink,
		rowCollapse,
		graphs,
		themes,
		filters,
		sortableFields,
		pageSize: { enum: PAGE_SIZES, default: DEFAULT_PAGE_SIZE }
	};
};

module.exports = getBrowseBaseSchema;
