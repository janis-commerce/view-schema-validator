'use strict';

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
				$ref: 'schemaDefinitions#/definitions/endpoint'
			},
			initialValuesFilterName: { type: 'string' },
			initialValuesPathParam: { type: 'string' },
			searchParam: { type: 'string', default: 'term' },
			valuesMapper: {
				type: 'object',
				properties: {
					label: { type: 'string' },
					value: { type: 'string' }
				},
				required: ['label', 'value'],
				additionalProperties: false
			}
		},
		required: ['endpoint', 'valuesMapper'],
		additionalProperties: false
	}
};
