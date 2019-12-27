'use strict';

module.exports = {
	type: 'object',
	additionalProperties: {
		type: 'object',
		additionalProperties: { type: 'string' }
	},
	minProperties: 1
};
