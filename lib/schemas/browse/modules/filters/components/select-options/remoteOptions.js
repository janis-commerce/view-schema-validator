'use strict';

const getEndpointParameters = require('../../../../../common/endpointParameters');

module.exports = {
	if: {
		properties: {
			scope: { const: 'remote' }
		}
	},
	then: {
		properties: {
			scope: { const: 'remote' },
			endpoint: {
				$ref: 'schemaDefinitions#/definitions/endpoint'
			},
			initialValuesEndpoint: {
				oneOf: [
					{ $ref: 'schemaDefinitions#/definitions/endpoint' },
					{ const: false }
				]
			},
			initialValuesFilterName: { type: 'string' },
			initialValuesPathParam: { type: 'string' },
			searchParam: { type: 'string', default: 'filters[search]' },
			endpointParameters: getEndpointParameters(true),
			valuesMapper: {
				type: 'object',
				properties: {
					label: {
						oneOf: [
							{ type: 'string' },
							{ $ref: 'schemaDefinitions#/definitions/template' }
						]
					},
					value: { type: 'string' }
				},
				default: {
					label: 'name',
					value: 'id'
				},
				required: ['label', 'value'],
				additionalProperties: false
			}
		},
		required: ['endpoint'],
		additionalProperties: false
	}
};
