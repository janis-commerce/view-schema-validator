'use strict';

const endpointParameters = {
	type: 'object',
	propertyNames: { type: 'string' },
	additionalProperties: { type: 'string' }
};

module.exports = {
	type: 'object',
	properties: {
		title: { type: 'string' },
		name: { type: 'string' },
		color: { type: 'string' },
		icon: { type: 'string' },
		type: { type: 'string' },
		options: {
			type: 'object',
			default: {}
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
					path: { type: 'string' },
					endpointParameters
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
					endpoint: {
						$ref: 'schemaDefinitions#/definitions/endpoint'
					},
					endpointParameters
				},
				default: {},
				additionalProperties: false
			}
		}
	},
	additionalProperties: false,
	required: ['name', 'type']
};
