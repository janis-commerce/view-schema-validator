'use strict';

const componentNames = require('./componentNames');
const filterComponents = require('./components');

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			component: { type: 'string', enum: Object.values(componentNames) },
			componentAttributes: {
				type: 'object',
				default: {}
			}
		},
		allOf: filterComponents,
		additionalProperties: false,
		required: ['component', 'name']
	},
	default: []
};
