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
				type: { enum: ['info', 'warning', 'error'], default: 'info' },
				closable: { type: 'boolean', default: false }
			},
			additionalProperties: false,
			default: {}
		}
	},
	required: ['value'],
	additionalProperties: false
};
