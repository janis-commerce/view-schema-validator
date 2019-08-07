'use strict';

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			icon: { type: 'string' },
			fields: {
				type: 'array',
				items: {
					$ref: 'schemaDefinitions#/definitions/editNewField'
				},
				minItems: 1
			}
		},
		required: ['name', 'fields'],
		additionalProperties: false
	},
	minItems: 1
};
