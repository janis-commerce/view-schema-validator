'use strict';

const { makeComponent } = require('../../../utils');
const { asyncWrapper } = require('../componentNames');
const getStaticFilters = require('../../../common/staticFilters');

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
		staticFilters: getStaticFilters()
	},
	requiredProperties: ['dataMapping', 'source', 'field']
});
