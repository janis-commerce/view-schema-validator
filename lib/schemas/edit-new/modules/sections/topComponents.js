'use strict';

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			component: { type: 'string' },
			attributes: {
				type: 'object',
				additionalProperties: true
			}
		},
		required: ['component'],
		additionalProperties: false
	},
	minItems: 1
};
