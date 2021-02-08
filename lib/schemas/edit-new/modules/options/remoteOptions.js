'use strict';

const getStaticFilters = require('../../../common/staticFilters');

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
			endpointParameters: getStaticFilters(),
			valuesMapper: {
				type: 'object',
				properties: {
					label: {
						oneOf: [
							{ type: 'string' },
							{
								type: 'object',
								properties: {
									template: { type: 'string' },
									fields: {
										type: 'array',
										items: {
											type: 'string'
										},
										minItems: 1
									}
								},
								required: ['template', 'fields'],
								additionalProperties: false
							}
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
