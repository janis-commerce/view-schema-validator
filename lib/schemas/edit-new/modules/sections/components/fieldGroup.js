'use strict';

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			icon: { type: 'string' },
			position: {
				type: 'string',
				enum: ['left', 'right']
			},
			collapsible: { type: 'boolean' },
			defaultOpen: { type: 'boolean' },
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
