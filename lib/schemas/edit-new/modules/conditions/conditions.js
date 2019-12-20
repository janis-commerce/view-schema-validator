'use strict';

const names = require('./names');

const conditionsSchema = {
	type: 'array',
	items: {
		type: 'array',
		items: {
			type: 'object',
			properties: {
				name: { enum: Object.values(names) },
				field: {
					anyOf: [
						{ type: 'string' },
						{
							type: 'array',
							items: {
								type: 'string'
							}
						}
					]
				},
				referenceValue: {
					type: ['string', 'number', 'boolean', 'object', 'array', 'null']
				}
			},
			required: ['name', 'field']
		},
		minItems: 1
	},
	minItems: 1
};

module.exports = {
	type: 'object',
	properties: {
		showWhen: conditionsSchema,
		enableWhen: conditionsSchema
	},
	additionalProperties: false,
	minProperties: 1
};
