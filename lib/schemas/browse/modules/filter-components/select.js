'use strict';

const { makeComponent } = require('../../../utils');

module.exports = makeComponent({
	name: 'Select',
	properties: {
		translateLabels: { type: 'boolean', default: true },
		labelPrefix: { type: 'string' },
		options: {
			oneOf: [
				{
					type: 'array',
					items: {
						type: 'object',
						properties: {
							label: { type: 'string' },
							value: {
								anyOf: [
									{ type: 'number' },
									{ type: 'string' },
									{ type: 'boolean' }
								]
							}
						},
						additionalProperties: false,
						required: ['label', 'value']
					}
				},
				{
					type: 'object',
					properties: {
						endpoint: {
							$ref: 'schemaDefinitions#/definitions/endpoint'
						},
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
			]
		}
	}
});
