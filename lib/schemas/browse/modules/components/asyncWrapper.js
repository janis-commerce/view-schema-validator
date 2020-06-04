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
		dataMatching: {
			type: 'object',
			properties: {
				local: { type: 'string' },
				remote: { type: 'string' }
			},
			minProperties: 2,
			additionalProperties: false
		},
		field: { $ref: 'schemaDefinitions#/definitions/browseField' },
		targetField: { type: 'string' }
	},
	requiredProperties: ['dataMapping', 'source', 'field']
});
