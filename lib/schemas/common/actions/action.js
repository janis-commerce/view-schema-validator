'use strict';

const { path } = require('../link').properties;

const endpointParameters = {
	oneOf: [
		{
			type: 'object',
			propertyNames: { type: 'string' },
			additionalProperties: { type: 'string' }
		},
		{ $ref: 'schemaDefinitions#/definitions/endpointParameters' }
	]
};

module.exports = {
	type: 'object',
	properties: {
		title: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		name: { type: 'string' },
		color: { type: 'string' },
		icon: { type: 'string' },
		type: { type: 'string' },
		options: {
			type: 'object',
			default: {}
		},
		behavior: {
			type: 'object',
			properties: {
				status: { type: 'string' },
				statusMotive: { type: 'string' }
			}
		}
	},
	if: {
		properties: {
			type: {
				enum: ['link']
			}
		}
	},
	then: {
		properties: {
			options: {
				type: 'object',
				properties: {
					path,
					target: { $ref: 'schemaDefinitions#/definitions/endpoint' },
					endpointParameters
				},
				default: {},
				additionalProperties: false
			}
		}
	},
	else: {
		if: {
			properties: {
				callback: { const: 'openModal' }
			}
		},
		then: {
			properties: {
				options: {
					type: 'object',
					properties: {
						endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
						endpointParameters,
						modalTitle: { type: 'string' },
						fields: {
							type: 'array',
							items: { $ref: 'schemaDefinitions#/definitions/actionField' },
							minItems: 1
						}
					},
					default: {},
					additionalProperties: false
				}
			}
		},
		else: {
			properties: {
				options: {
					type: 'object',
					properties: {
						endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
						endpointParameters
					},
					default: {},
					additionalProperties: false
				}
			}
		}
	},
	additionalProperties: false,
	required: ['name', 'type']
};
