'use strict';

const { baseCard } = require('../../cardNames');
const fieldsGroup = require('../../../components/fieldGroup');

module.exports = {
	if: {
		properties: {
			component: { const: baseCard }
		}
	},
	then: {
		properties: {
			component: { type: 'string', const: baseCard },
			fieldsGroup
		},
		required: ['component', 'fieldsGroup'],
		additionalProperties: false
	}
};
