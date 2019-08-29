'use strict';

module.exports = {
	type: 'object',
	properties: {
		components: {
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
		}
	},
	minProperties: 1,
	additionalProperties: false
};
