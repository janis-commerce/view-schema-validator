'use strict';

const PAGE_SIZES = [15, 30, 60, 100];
const DEFAULT_PAGE_SIZE = 60;

module.exports = {
	fields: {
		type: 'array',
		items: {
			$ref: 'schemaDefinitions#/definitions/browseField'
		},
		minItems: 1
	},
	hasPreview: { type: 'boolean', default: false },
	canEdit: { type: 'boolean', default: true },
	canView: { type: 'boolean', default: false },
	pageSize: { enum: PAGE_SIZES, default: DEFAULT_PAGE_SIZE }
};
