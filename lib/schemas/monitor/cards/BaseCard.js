'use strict';

const { baseCard } = require('./cardNames');
const fieldsGroup = require('../../../schemas/common-sections/sections/components/fieldGroup');
const actions = require('./actions');

module.exports = {
	if: {
		properties: {
			component: { const: baseCard }
		}
	},
	then: {
		properties: {
			component: { type: 'string', const: baseCard },
			actions,
			fieldsGroup
		},
		required: ['component', 'fieldsGroup'],
		additionalProperties: false
	}
};
