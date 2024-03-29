'use strict';

const names = require('./names');

const fieldProps = {
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
};

const conditionsProperties = {
	name: { enum: names },
	field: fieldProps,
	innerField: fieldProps,
	referenceValueType: {
		type: 'string',
		enum: ['static', 'dynamic']
	}
};

const conditionsSchema = {
	type: 'array',
	items: {
		type: 'array',
		items: {
			type: 'object',
			properties: {
				...conditionsProperties,
				referenceValue: {
					type: ['string', 'number', 'boolean', 'object', 'array', 'null']
				},
				dynamicValue: {
					type: ['string'],
					enum: ['date']
				}
			},
			allOf: [
				{
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
						required: ['name']
					}
				},
				{
					if: {
						not: {
							properties: { referenceValue: { const: false } }
						}
					},
					then: {
						properties: {
							...conditionsProperties,
							dynamicValue: {
								type: ['string'],
								enum: ['date']
							}
						}
					},
					else: {
						properties: {
							...conditionsProperties,
							referenceValue: {
								type: [
									'string',
									'number',
									'boolean',
									'object',
									'array',
									'null'
								]
							}
						}
					}
				}
			]
		},
		minItems: 1
	},
	minItems: 1
};

const makeBaseConditions = (addEnableWhen = true, addMatchWhen = false) => {
	const properties = { showWhen: conditionsSchema };

	if(addEnableWhen)
		properties.enableWhen = conditionsSchema;

	if(addMatchWhen)
		properties.matchWhen = conditionsSchema;

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
