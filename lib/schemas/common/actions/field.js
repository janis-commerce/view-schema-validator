'use strict';

const browseComponents = require('../../browse/modules/components');
const browseComponentNames = require('../../browse/modules/componentNames');
const { makeComponent } = require('../../utils');
const mapper = require('../mapper');
const makeBaseConditions = require('../conditions');

const filteredBrowseComponents = browseComponents.filter(component => {
	const browseComponentKey = component.if.properties.component;
	const componentName =
		browseComponentKey.const ||
		(browseComponentKey.enum
			? browseComponentKey.enum[0]
			: null);
	return componentName !== 'FieldList';
});

const components = [
	...filteredBrowseComponents,
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
	})
];

module.exports = {
	type: 'object',
	properties: {
		component: { type: 'string', enum: Object.values(browseComponentNames) },
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
