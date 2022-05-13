'use strict';

const { StepsCard } = require('../cardNames');

module.exports = {
	if: {
		properties: {
			component: { const: StepsCard }
		}
	},
	then: {
		properties: {
			component: { type: 'string', const: StepsCard },
			icon: { type: 'string' },
			stepKey: { type: 'string' },
			tooltip: { type: 'string' },
			maxNextSteps: { type: 'number' },
			label: { $ref: 'schemaDefinitions#/definitions/stringPrefix' }
		},
		required: ['component'],
		additionalProperties: false
	}
};
