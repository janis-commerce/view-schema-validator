'use strict';

const stringType = { type: 'string' };

const entityProp = {
	type: 'array',
	items: stringType,
	minItems: 1
};


const filtersEntitySchema = {
	oneOf: [
		{ const: false },
		{
			type: 'object',
			properties: {
				include: { type: 'array', items: stringType },
				exclude: { type: 'array', items: stringType }
			},
			additionalProperties: false
		}
	]
};

const exportEntityObjectSchema = {
	type: 'object',
	properties: {
		name: stringType,
		type: entityProp,
		format: entityProp,
		fields: entityProp,
		filters: filtersEntitySchema
	},
	additionalProperties: false,
	required: ['name']
};

const entitiesSchema = {
	oneOf: [
		stringType,
		exportEntityObjectSchema
	]
};

module.exports = (isExport = true) => ({
	anyOf: [
		{ type: 'boolean' },
		{
			type: 'object',
			properties: {
				entities: {
					type: 'array',
					items: isExport ? entitiesSchema : stringType,
					minItems: 1
				}
			},
			additionalProperties: false
		}
	]
});
