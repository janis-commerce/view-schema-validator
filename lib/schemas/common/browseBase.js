'use strict';

const filters = require('../browse/modules/filters');

const PAGE_SIZES = [15, 30, 60, 100];
const DEFAULT_PAGE_SIZE = 60;


const getBrowseBaseSchema = (isPage = false) => {
	const getStaticFiltersValue = () => {
		const dynamicProps = !isPage ? { dynamic: { type: 'string' } } : {};

		return {
			...dynamicProps,
			static: {
				anyOf: [
					{ type: 'string' },
					{ type: 'number' },
					{ type: 'array' },
					{ type: 'object' }
				]
			}
		};
	};

	return {
		fields: {
			type: 'array',
			items: {
				$ref: 'schemaDefinitions#/definitions/browseField'
			},
			minItems: 1
		},
		staticFilters: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					name: { type: 'string' },
					target: { enum: ['path', 'query'] },
					value: {
						type: 'object',
						properties: getStaticFiltersValue(),
						additionalProperties: false,
						minProperties: 1,
						maxProperties: 1
					}
				},
				required: ['name', 'target', 'value']
			},
			minItems: 1
		},
		hasPreview: { type: 'boolean', default: false },
		canEdit: { type: 'boolean', default: true },
		canCreate: { type: 'boolean', default: true },
		canView: { type: 'boolean', default: false },
		filters,
		pageSize: { enum: PAGE_SIZES, default: DEFAULT_PAGE_SIZE }
	};
};

module.exports = getBrowseBaseSchema;
