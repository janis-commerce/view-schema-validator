'use strict';

const filters = require('../browse/modules/filters');
const themes = require('./status-themes');
const sortableFields = require('../browse/modules/sortableFields');
const getStaticFilters = require('./staticFilters');

const PAGE_SIZES = [15, 30, 60, 100];
const DEFAULT_PAGE_SIZE = 60;


const getBrowseBaseSchema = (isPage = false) => {
	return {
		fields: {
			type: 'array',
			items: {
				$ref: 'schemaDefinitions#/definitions/browseField'
			},
			minItems: 1
		},
		staticFilters: getStaticFilters(isPage),
		hasPreview: { type: 'boolean', default: false },
		canEdit: { type: 'boolean', default: true },
		canCreate: { type: 'boolean', default: true },
		canView: { type: 'boolean', default: false },
		canExport: { type: 'boolean', default: false },
		appearance: {
			type: 'object',
			properties: {
				desktop: {
					type: 'object',
					properties: {
						rowMinHeight: { type: 'number' }
					},
					additionalProperties: false,
					minProperties: 1
				}
			},
			additionalProperties: false,
			minProperties: 1
		},
		themes,
		filters,
		sortableFields,
		pageSize: { enum: PAGE_SIZES, default: DEFAULT_PAGE_SIZE }
	};
};

module.exports = getBrowseBaseSchema;
