'use strict';

const mapper = require('../../common/mapper');

module.exports = {
	type: 'object',
	properties: {
		value: { type: 'string' },
		mapper,
		componentAttributes: {
			type: 'object',
			properties: {
				type: { enum: ['info', 'warning', 'error'] },
				closable: { type: 'boolean' }
			},
			additionalProperties: false
		}
	},
	required: ['value'],
	additionalProperties: false
};
