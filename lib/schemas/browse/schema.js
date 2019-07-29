'use strict';

const field = require('./modules/field');
const { properties, required } = require('../common/base');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		root: { const: 'Browse' },
		fields: {
			type: 'array',
			items: field,
			minItems: 1
		}
	},
	additionalProperties: false,
	required: [...required, 'fields']
};
