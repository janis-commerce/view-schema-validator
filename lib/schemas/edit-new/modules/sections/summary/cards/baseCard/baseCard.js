'use strict';

const { baseCard } = require('../../cardNames');
const fieldsGroup = require('./fieldsGroup');

module.exports = {
	if: {
		properties: {
			component: { const: baseCard }
		}
	},
	then: {
		properties: {
			component: { type: 'string', const: baseCard },
			name: { type: 'string' },
			fieldsGroup
		},
		required: ['name', 'component', 'fieldsGroup'],
		additionalProperties: false
	}
};
