'use strict';

const getStaticFilters = require('../../../common/staticFilters');

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			endpointParameters: getStaticFilters(),
			dataMapping: {
				type: 'object',
				additionalProperties: { type: 'string' }
			},
			triggerOnLoad: { type: 'boolean' }
		},
		requiredProperties: ['endpoint', 'dataMapping']
	},
	minItems: 1
};
