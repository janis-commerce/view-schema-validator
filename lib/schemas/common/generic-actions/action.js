'use strict';

const commonAttrs = {
	variant: { enum: ['cleaned', 'contained', 'outlined'] },
	color: { type: 'string' },
	icon: { type: 'string' },
	iconColor: { type: 'string' },
	backgroundColor: { type: 'string' }
};

module.exports = {
	type: 'object',
	properties: {
		componentAttributes: commonAttrs,
		title: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		name: { type: 'string' },
		type: { type: 'string' },
		kind: { type: 'string' },
		sections: {
			type: 'array',
			items: { type: 'string' },
			minItems: 1
		}
	},
	allOf: [
		{
			if: {
				properties: {
					type: { const: 'link' }
				}
			},
			then: {
				properties: {
					componentAttributes: {
						type: 'object',
						properties: {
							...commonAttrs,
							linkTarget: { type: 'string' },
							path: { type: 'string' },
							target: { $ref: 'schemaDefinitions#/definitions/endpoint' },
							endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
						},
						default: {},
						additionalProperties: false
					}
				}
			}
		},
		{
			if: {
				properties: {
					type: { const: 'endpoint' }
				}
			},
			then: {
				properties: {
					componentAttributes: {
						type: 'object',
						properties: {
							...commonAttrs,
							endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
							endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
						},
						default: {},
						additionalProperties: false
					}
				}
			}
		},
		{
			if: {
				properties: {
					type: { const: 'form' }
				}
			},
			then: {
				properties: {
					componentAttributes: {
						type: 'object',
						properties: {
							...commonAttrs,
							modalSize: { $ref: 'schemaDefinitions#/definitions/modalSize' },
							endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
							endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
							fields: {
								type: 'array',
								items: { $ref: 'schemaDefinitions#/definitions/editNewField' },
								minItems: 1
							}
						},
						required: ['fields'],
						additionalProperties: false
					}
				}
			}
		}
	],
	additionalProperties: false,
	required: ['name', 'type']
};
