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

// Button appearance, read from `componentAttributes` by the action types that do not use `options`
const buttonAttributes = {
	variant: { enum: ['cleaned', 'contained', 'outlined'] },
	color: { type: 'string' },
	icon: { type: 'string' },
	iconColor: { type: 'string' },
	backgroundColor: { type: 'string' }
};

const optionsValidation = {
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
	}
};

// A `form` action declares the modal form in `componentAttributes`, every other type keeps it forbidden
const componentAttributesValidation = {
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
					...buttonAttributes,
					modalSize: { $ref: 'schemaDefinitions#/definitions/modalSize' },
					endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
					endpointParameters,
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
	},
	else: {
		properties: {
			componentAttributes: {
				type: 'object',
				additionalProperties: false
			}
		}
	}
};

module.exports = {
	type: 'object',
	properties: {
		title: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		name: { type: 'string' },
		color: { type: 'string' },
		icon: { type: 'string' },
		type: { type: 'string' },
		componentAttributes: { type: 'object' },
		options: {
			type: 'object',
			default: {}
		}
	},
	allOf: [
		optionsValidation,
		componentAttributesValidation
	],
	additionalProperties: false,
	required: ['name', 'type']
};
