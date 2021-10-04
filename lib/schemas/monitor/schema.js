'use strict';

const { properties, required } = require('../common/base');
const filters = require('../browse/modules/filters');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		filters,
		root: { const: 'Monitor' },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		schemaSource: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		fields: {
			type: 'array',
			items: { $ref: 'schemaDefinitions#/definitions/browseField' },
			minItems: 1
		}
	},
	additionalProperties: false,
	required: [...required]
};
