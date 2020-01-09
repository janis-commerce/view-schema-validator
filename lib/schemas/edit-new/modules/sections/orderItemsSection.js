'use strict';

const { orderItemsSection } = require('../sectionsNames');
const getStaticFilters = require('../../../common/staticFilters');

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
			staticFilters: getStaticFilters()
		},
		required: ['name', 'rootComponent'],
		additionalProperties: false
	}
};
