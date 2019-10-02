'use strict';

const commonAfterBefore = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			component: { enum: ['BadgeLetter', 'StatusChip'] }
		},
		minItems: 1
	}
};

module.exports = {
	type: 'object',
	properties: {
		title: {
			type: 'object',
			properties: {
				afterId: commonAfterBefore,
				beforeId: commonAfterBefore
			},
			minProperties: 1,
			additionalProperties: false
		}
	},
	minProperties: 1,
	additionalProperties: false
};
