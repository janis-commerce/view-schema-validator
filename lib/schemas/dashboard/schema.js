'use strict';

const { properties, required } = require('../common/base');
const filters = require('../browse/modules/filters');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		root: { const: 'Dashboard' },
		filters,
		graphs: { $ref: 'schemaDefinitions#/definitions/graphs' }
	},
	additionalProperties: false,
	required: [...required, 'graphs']
};
