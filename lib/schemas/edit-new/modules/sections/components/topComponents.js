'use strict';

const action = require('../../../../common/actions/action');

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

const availableCallbacks = ['reloadSectionData', 'refresh'];

const customAction = {
	...action,
	properties: {
		...action.properties,
		callback: {
			enum: availableCallbacks
		}
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
				actions: {
					type: 'array',
					items: customAction
				},
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
