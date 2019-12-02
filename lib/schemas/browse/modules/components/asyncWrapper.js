'use strict';

const { makeComponent } = require('../../../utils');
const { asyncWrapper } = require('../componentNames');

module.exports = makeComponent({
	name: asyncWrapper,
	properties: {
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		dataMapping: {
			type: 'object',
			additionalProperties: { type: 'string' }
		},
		field: {
			$ref: 'schemaDefinitions#/definitions/browseField'
		}
	},
	requiredProperties: ['dataMapping', 'source', 'field']
});
