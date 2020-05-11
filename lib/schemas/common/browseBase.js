'use strict';

const filters = require('../browse/modules/filters');
const themes = require('./status-themes');
const sortableFields = require('../browse/modules/sortableFields');
const getStaticFilters = require('./staticFilters');

const PAGE_SIZES = [15, 30, 60, 100];
const DEFAULT_PAGE_SIZE = 60;


const makeAppearance = () => {
	const appearanceProps = {
		type: 'object',
		properties: {
			rowMinHeight: { type: 'number' },
			rowVerticalAlign: { enum: ['top', 'middle', 'bottom'] }
		},
		additionalProperties: false,
		minProperties: 1
	};

	return {
		type: 'object',
		properties: {
			default: appearanceProps,
			desktop: appearanceProps,
			mobile: appearanceProps
		},
		additionalProperties: false,
		minProperties: 1
	};
};

const getBrowseBaseSchema = (isPage = false) => {
	return {
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		fields: {
			type: 'array',
			items: {
				$ref: 'schemaDefinitions#/definitions/browseField'
			},
			minItems: 1
		},
		sortEndpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		staticFilters: getStaticFilters(isPage),
		hasPreview: { type: 'boolean', default: false },
		canEdit: { type: 'boolean', default: true },
		canCreate: { type: 'boolean', default: true },
		canView: { type: 'boolean', default: false },
		canExport: { type: 'boolean', default: false },
		canRefresh: { type: 'boolean' },
		appearance: makeAppearance(),
		themes,
		filters,
		sortableFields,
		pageSize: { enum: PAGE_SIZES, default: DEFAULT_PAGE_SIZE }
	};
};

module.exports = getBrowseBaseSchema;
