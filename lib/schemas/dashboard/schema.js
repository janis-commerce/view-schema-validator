'use strict';

const { properties, required } = require('../common/base');
const filters = require('../browse/modules/filters');
const graphs = require('../common/graphs');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		root: { const: 'Dashboard' },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		filters,
		graphs
	},
	additionalProperties: false,
	required: [...required, 'graphs']
};
