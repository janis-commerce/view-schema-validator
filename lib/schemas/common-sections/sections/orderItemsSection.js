'use strict';

const { orderItemsSection } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: orderItemsSection }
		}
	},
	then: {
		properties: {
			title: { type: 'string' },
			name: { type: 'string' },
			rootComponent: { type: 'string', const: orderItemsSection },
			source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			sourceField: { type: 'string' },
			staticFilters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
			endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
			showPickingSessions: { type: 'boolean' },
			showPurchasedItems: { type: 'boolean' },
			showPickedItems: { type: 'boolean' },
			showClaimItems: { type: 'boolean' },
			canEditPrice: { type: 'boolean' }
		},
		required: ['name', 'rootComponent'],
		additionalProperties: false
	}
};
