'use strict';

module.exports = {
	type: 'object',
	properties: {
		root: { type: 'string' }
	},
	additionalProperties: true,
	required: ['root']
};
