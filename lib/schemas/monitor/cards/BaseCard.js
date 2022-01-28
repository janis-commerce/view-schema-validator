'use strict';

const { baseCard } = require('./cardNames');
const fieldsGroup = require('../../../schemas/common-sections/sections/components/fieldGroup');
const makeGenericActions = require('../../common/generic-actions');

module.exports = {
	if: {
		properties: {
			component: { const: baseCard }
		}
	},
	then: {
		properties: {
			component: { type: 'string', const: baseCard },
			actions: makeGenericActions({ customCallbacks: [] }),
			fieldsGroup
		},
		required: ['component', 'fieldsGroup'],
		additionalProperties: false
	}
};
