'use strict';

const { makeComponent } = require('../../../utils');
const { asyncWrapper } = require('../componentNames');

const endpointParameters = { $ref: 'schemaDefinitions#/definitions/endpointParameters' };
const dataMapping = { type: 'object', additionalProperties: { type: 'string' } };
const targetField = { type: 'string' };

module.exports = makeComponent({
	name: asyncWrapper,
	properties: {
		dataMapping,
		targetField,
		endpointParameters,
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		field: { $ref: 'schemaDefinitions#/definitions/editNewField' }
	},
	conditions: {
		anyOf: [
			{
				required: ['dataMapping'],
				properties: { dataMapping }
			},
			{
				required: ['targetField'],
				properties: { targetField }
			}
		]
	},
	requiredProperties: ['source', 'field']
});
