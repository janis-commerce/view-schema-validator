'use strict';

const filterComponents = require('./filter-components');

const FILTER_TYPES = ['equal', 'search'];
const componentNames = ['Input', 'Select'];

module.exports = {
	type: 'object',
	properties: {
		component: { enum: componentNames },
		type: { enum: FILTER_TYPES, default: 'equal' },
		remote: { type: 'boolean', default: false },
		componentAttributes: {
			type: 'object',
			default: {}
		}
	},
	allOf: filterComponents,
	additionalProperties: false,
	required: ['component']
};
