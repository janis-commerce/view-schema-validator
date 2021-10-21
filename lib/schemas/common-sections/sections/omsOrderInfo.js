'use strict';

const { omsOrderInfo } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: omsOrderInfo }
		}
	},
	then: {
		properties: {
			title: { type: 'string' },
			name: { type: 'string' },
			rootComponent: { type: 'string', const: omsOrderInfo }
		},
		required: ['name', 'rootComponent'],
		additionalProperties: false
	}
};
