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
				include: { type: 'array', items: stringType, minItems: 1 }
			},
			required: ['include'],
			additionalProperties: false
		},
		{
			type: 'object',
			properties: {
				exclude: { type: 'array', items: stringType, minItems: 1 }
			},
			required: ['exclude'],
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
					// Import receives file paths as plain strings; filters only apply to export
					items: isExport ? entitiesSchema : stringType,
					minItems: 1
				}
			},
			additionalProperties: false
		}
	]
});
