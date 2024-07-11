'use strict';

const { properties, required } = require('../common/base');
const filters = require('../browse/modules/filters');
const sortableFields = require('../common/sortableFields');
const customLink = require('../common/customLink');
const makeConditions = require('../common/conditions');
const statusBar = require('../common/statusBar');
const themes = require('../common/themes');
const mapper = require('../common/mapper');
const { modifySchemaThenProperties } = require('../utils');
const cards = require('./cards');
const cardNames = require('./cards/cardNames');

const cardsModified = cards.map(card => modifySchemaThenProperties(card, {
	properties: {
		mapper,
		name: { type: 'string' },
		columnLink: { type: 'string' },
		label: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		actionsModalSize: { $ref: 'schemaDefinitions#/definitions/modalSize' },
		translateLabel: { type: 'boolean' },
		conditions: makeConditions(false, true),
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
	},
	requiredProperties: ['name']
}));

module.exports = {
	type: 'object',
	properties: {
		...properties,
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
		themes,
		filters,
		statusBar,
		sortableFields,
		featureFlags: { $ref: 'schemaDefinitions#/definitions/featureFlags' },
		root: { const: 'Monitor' },
		autoRefresh: { $ref: 'schemaDefinitions#/definitions/autoRefresh' },
		dependencies: { $ref: 'schemaDefinitions#/definitions/dependencies' },
		cardLink: {
			oneOf: [{ const: false }, customLink]
		},
		columnsWidth: { type: ['number', 'string'] },
		columnsQuantityScroll: { type: 'number' },
		schemaSource: {
			type: 'object',
			properties: {
				type: { type: 'string', enum: ['static', 'dynamic'] },
				endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
				endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
			},
			required: ['type', 'endpoint'],
			minProperties: 2,
			additionalProperties: false
		},
		fields: {
			type: 'array',
			items: {
				properties: {
					component: { enum: Object.values(cardNames) }
				},
				allOf: cardsModified
			},
			minItems: 1
		}
	},
	additionalProperties: false,
	required: [...required]
};
