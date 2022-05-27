'use strict';

const makeConditions = require('./conditions');
const mapper = require('./mapper');

module.exports = {
	type: 'object',
	properties: {
		mapper,
		template: { type: 'string' },
		fields: {
			type: 'array',
			items: {
				oneOf: [
					{ type: 'string' },
					{
						type: 'object',
						properties: {
							name: { type: 'string' },
							conditions: makeConditions(false),
							mapper
						},
						required: ['name'],
						additionalProperties: false
					}
				]
			},
			minItems: 1
		}
	},
	required: ['template', 'fields'],
	additionalProperties: false
};
