'use strict';

const browseComponentNames = require('../../browse/modules/componentNames');
const texts = require('../../browse/modules/components/texts');
const { makeComponent } = require('../../utils');
const mapper = require('../mapper');
const makeBaseConditions = require('../conditions');

const components = [
	...texts,
	makeComponent({
		name: 'FieldList',
		properties: {
			direction: {
				type: 'string',
				enum: ['horizontal', 'vertical'],
				default: 'vertical'
			},
			fields: {
				type: 'array',
				items: {
					$ref: 'schemaDefinitions#/definitions/actionField'
				},
				minItems: 1
			}
		},
		requiredProperties: ['direction', 'fields']
	}),
	makeComponent({ name: 'CopyToClipboardButton', properties: {} })
];

const componentNames = {
	...browseComponentNames,
	copyToClipBoardButton: 'CopyToClipboardButton'
};

module.exports = {
	type: 'object',
	properties: {
		component: { type: 'string', enum: Object.values(componentNames) },
		name: { type: 'string' },
		label: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		attributes: {
			type: 'object',
			properties: {
				isStatus: { type: 'boolean', default: false },
				sortable: { type: 'boolean', default: false },
				isDefaultSort: { type: 'boolean', default: false },
				initialSortDirection: {
					type: 'string',
					enum: ['desc', 'asc'],
					default: 'desc'
				}
			},
			additionalProperties: false,
			default: {}
		},
		componentAttributes: {
			type: 'object',
			default: {}
		},
		mapper,
		conditions: makeBaseConditions(false)
	},
	allOf: components,
	additionalProperties: false,
	required: ['component', 'name', 'attributes']
};
