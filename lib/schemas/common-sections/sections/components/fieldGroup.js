'use strict';

const makeConditions = require('../../../common/conditions');

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			icon: { type: 'string' },
			translateLabel: { type: 'boolean' },
			position: {
				type: 'string',
				enum: ['left', 'right']
			},
			collapsible: { type: 'boolean' },
			defaultOpen: { type: 'boolean' },
			conditions: makeConditions(false),
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
