'use strict';

const actions = require('../../../../common/actions');

const commonProperties = {
	position: {
		type: 'string',
		enum: ['left', 'right']
	},
	attributes: {
		type: 'object',
		additionalProperties: true
	}
};

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		if: {
			properties: {
				component: { const: 'ActionButtons' }
			}
		},
		then: {
			properties: {
				actions,
				...commonProperties
			},
			required: ['actions', 'component']
		},
		else: {
			properties: {
				component: { type: 'string' },
				...commonProperties
			},
			required: ['component'],
			additionalProperties: false
		}
	},
	minItems: 1
};
