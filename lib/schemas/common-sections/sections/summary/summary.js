'use strict';

const { summary } = require('../../sectionsNames');
const { modifySchemaThenProperties } = require('../../../utils');
const cards = require('./cards');
const cardNames = require('./cardNames');
const commonCardsProps = require('./commonCardsProps');

const cardsModified = cards.map(card => modifySchemaThenProperties(card, commonCardsProps));

module.exports = {
	if: {
		properties: {
			rootComponent: { const: summary }
		}
	},
	then: {
		properties: {
			name: { type: 'string' },
			rootComponent: { type: 'string', const: summary },
			source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			dependencies: { $ref: 'schemaDefinitions#/definitions/dependencies' },
			cards: {
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
		required: ['name', 'rootComponent', 'cards'],
		additionalProperties: false
	}
};
