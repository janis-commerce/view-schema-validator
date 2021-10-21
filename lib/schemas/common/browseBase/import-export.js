'use strict';

const stringType = { type: 'string' };

const entityProp = {
	type: 'array',
	items: stringType,
	minItems: 1
};

const entitiesSchema = {
	oneOf: [
		stringType,
		{
			type: 'object',
			properties: {
				name: stringType,
				type: entityProp,
				format: entityProp,
				fields: entityProp
			},
			additionalProperties: false,
			required: ['name']
		}
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
