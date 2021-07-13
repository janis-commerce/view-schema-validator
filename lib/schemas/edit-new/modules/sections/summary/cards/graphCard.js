'use strict';

const { graphCard } = require('../cardNames');

module.exports = {
	if: {
		properties: {
			component: { const: graphCard }
		}
	},
	then: {
		properties: {
			component: { type: 'string', const: graphCard },
			graphs: { $ref: 'schemaDefinitions#/definitions/graphs' }
		},
		required: ['component', 'graphs'],
		additionalProperties: false
	}
};
