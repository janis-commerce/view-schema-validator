'use strict';

const { conditionsSchema } = require('./conditions/conditions');

module.exports = {
	type: 'object',
	properties: {
		field: { type: 'string' },
		hide: { type: 'boolean' },
		useTheme: {
			oneOf: [
				{ type: 'boolean' },
				{ type: 'string' }
			]
		},
		themeConditionals: {
			type: 'object',
			additionalProperties: conditionsSchema,
			minProperties: 1
		}
	},
	minProperties: 1
};
