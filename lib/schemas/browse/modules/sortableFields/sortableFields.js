'use strict';

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			isDefaultSort: { type: 'boolean', default: false },
			initialSortDirection: {
				type: 'string',
				enum: ['desc', 'asc'],
				default: 'desc'
			}
		},
		additionalProperties: false,
		required: ['name']
	}
};
