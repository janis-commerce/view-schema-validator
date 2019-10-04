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
			rootComponent: { type: 'string', const: orderItemsSection }
		},
		required: ['name', 'rootComponent'],
		additionalProperties: false
	}
};
