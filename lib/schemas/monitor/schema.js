'use strict';

const { properties, required } = require('../common/base');
const filters = require('../browse/modules/filters');
const sortableFields = require('../common/sortableFields');
const customLink = require('../common/customLink');
const makeConditions = require('../common/conditions');
const statusBar = require('../common/statusBar');
const themes = require('../common/themes');
const { modifySchemaThenProperties } = require('../utils');
const cards = require('./cards');
const cardNames = require('./cards/cardNames');

const cardsModified = cards.map(card => modifySchemaThenProperties(card, {
	properties: {
		name: { type: 'string' },
		label: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		actionsModalSize: { $ref: 'schemaDefinitions#/definitions/modalSize' },
		translateLabel: { type: 'boolean' },
		conditions: makeConditions(false, true)
	},
	requiredProperties: ['name']
}));

module.exports = {
	type: 'object',
	properties: {
		...properties,
		themes,
		filters,
		statusBar,
		sortableFields,
		root: { const: 'Monitor' },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		autoRefresh: { $ref: 'schemaDefinitions#/definitions/autoRefresh' },
		dependencies: { $ref: 'schemaDefinitions#/definitions/dependencies' },
		endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
		cardLink: {
			oneOf: [{ const: false }, customLink]
		},
		schemaSource: {
			type: 'object',
			properties: {
				type: { type: 'string', enum: ['static', 'dynamic'] },
				endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
				endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
			},
			required: ['type', 'endpoint'],
			minProps: 2,
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
