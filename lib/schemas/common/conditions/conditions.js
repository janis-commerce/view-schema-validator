'use strict';

const names = require('./names');

const conditionsSchema = {
	type: 'array',
	items: {
		type: 'array',
		items: {
			type: 'object',
			properties: {
				name: { enum: names },
				field: {
					anyOf: [
						{ type: 'string' },
						{
							type: 'array',
							items: {
								type: 'string'
							},
							minItems: 1
						}
					]
				},
				referenceValueType: {
					type: 'string',
					enum: ['static', 'dynamic']
				},
				referenceValue: {
					type: ['string', 'number', 'boolean', 'object', 'array', 'null']
				}
			},
			if: {
				properties: {
					name: {
						enum: ['isDev', 'isNotDev']
					}
				}
			},
			then: {
				required: ['name']
			},
			else: {
				required: ['name', 'field']
			}
		},
		minItems: 1
	},
	minItems: 1
};

const makeBaseConditions = (addEnableWhen = true) => {
	const properties = { showWhen: conditionsSchema };

	if(addEnableWhen)
		properties.enableWhen = conditionsSchema;

	return {
		type: 'object',
		properties,
		additionalProperties: false,
		minProperties: 1
	};
};

module.exports = {
	conditionsSchema,
	makeBaseConditions
};
