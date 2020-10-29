'use strict';

module.exports = {
	type: 'object',
	additionalProperties: {
		type: 'object',
		additionalProperties: {
			anyOf: [
				{ type: 'string' },
				{
					type: 'object',
					minProperties: 1,
					additionalProperties: { type: 'string' }
				}
			]
		}
	},
	minProperties: 1
};
