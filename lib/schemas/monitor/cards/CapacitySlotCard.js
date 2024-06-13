'use strict';

const { capacitySlotCard } = require('./cardNames');
const makeGenericActions = require('../../common/generic-actions');

module.exports = {
	if: {
		properties: {
			component: { const: capacitySlotCard }
		}
	},
	then: {
		properties: {
			component: { type: 'string', const: capacitySlotCard },
			actions: makeGenericActions({ customCallbacks: [] })
		},
		required: ['component'],
		additionalProperties: false
	}
};
