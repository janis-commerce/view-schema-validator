'use strict';

const { makeComponent } = require('../../../utils');
const { asyncWrapper } = require('../componentNames');
const getEndpointParameters = require('../../../common/endpointParameters');

module.exports = makeComponent({
	name: asyncWrapper,
	properties: {
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		dataMapping: {
			type: 'object',
			additionalProperties: { type: 'string' }
		},
		field: {
			$ref: 'schemaDefinitions#/definitions/editNewField'
		},
		staticFilters: getEndpointParameters(),
		endpointParameters: getEndpointParameters()
	},
	requiredProperties: ['dataMapping', 'source', 'field']
});
