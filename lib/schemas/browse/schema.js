'use strict';

const { properties, required } = require('../common/base');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		root: { const: 'Browse' },
		fields: {
			type: 'array',
			items: {
				$ref: 'schemaDefinitions#/definitions/browseField'
			},
			minItems: 1
		}
	},
	additionalProperties: false,
	required: [...required, 'fields']
};
