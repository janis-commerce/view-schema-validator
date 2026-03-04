'use strict';

/**
 * Schema condicional compartido para options con scope === 'remote' (Select/Multiselect).
 * Cada consumidor (edit-new, browse filters) inyecta su propio endpointParameters.
 * @param {object} endpointParametersSchema - Definición de endpointParameters (ref o getEndpointParameters(...))
 * @returns {{ if: object, then: object }}
 */
function getRemoteOptions(endpointParametersSchema) {
	return {
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
				endpointParameters: endpointParametersSchema,
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
				},
				groupField: { type: 'string' },
				localValues: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							value: { type: 'string' },
							label: { type: 'string' }
						},
						required: ['value', 'label'],
						additionalProperties: false
					}
				}
			},
			required: ['endpoint'],
			additionalProperties: false
		}
	};
}

module.exports = getRemoteOptions;
