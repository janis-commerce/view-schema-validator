'use strict';

module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			endpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
			endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
			dataMapping: {
				type: 'object',
				additionalProperties: { type: 'string' }
			},
			componentMapping: {
				type: 'object',
				additionalProperties: {
					type: 'object',
					properties: {
						root: {
							type: 'array',
							items: { type: 'string' },
							minItems: 1
						}
					},
					additionalProperties: {
						type: 'string'
					}
				}
			},
			triggerOnLoad: { type: 'boolean' }
		},
		required: ['endpoint']
	},
	minItems: 1
};
