'use strict';

const filters = require('../browse/modules/filters');
const getStaticFilters = require('./staticFilters');

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			filters,
			component: { type: 'string' },
			name: { type: 'string' },
			title: { type: 'string' },
			translateTitle: { type: 'boolean' },
			subtitle: { type: 'string' },
			translateSubtitle: { type: 'boolean' },
			source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			endpointParameters: getStaticFilters(),
			componentAttributes: { type: 'object' },
			x: { type: 'number' },
			y: { type: 'number' },
			width: { type: 'number' },
			height: { type: 'number' }
		},
		additionalProperties: false,
		required: ['component', 'source', 'name', 'x', 'y', 'width', 'height']
	},
	minItems: 1
};
