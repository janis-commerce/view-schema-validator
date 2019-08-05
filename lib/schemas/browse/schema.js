'use strict';

const { properties, required } = require('../common/base');
const action = require('./modules/action');

const PAGE_SIZES = [15, 30, 60, 100];
const DEFAULT_PAGE_SIZE = 60;

module.exports = {
	type: 'object',
	properties: {
		...properties,
		root: { const: 'Browse' },
		fields: {
			type: 'array',
			items: {
				$ref: 'schemaDefinitions#/definitions/browseField'
			},
			minItems: 1
		},
		actions: {
			type: 'array',
			items: action,
			minItems: 1
		},
		hasPreview: { type: 'boolean', default: false },
		canEdit: { type: 'boolean', default: true },
		canView: { type: 'boolean', default: false },
		pageSize: { enum: PAGE_SIZES, default: DEFAULT_PAGE_SIZE }
	},
	additionalProperties: false,
	required: [...required, 'fields']
};
