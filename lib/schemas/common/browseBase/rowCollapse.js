'use strict';

module.exports = {
	type: 'object',
	properties: {
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		previewSource: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
		sourceField: { type: 'string' },
		fields: {
			type: 'array',
			items: { $ref: 'schemaDefinitions#/definitions/browseField' },
			minItems: 1
		}
	},
	required: ['fields'],
	additionalProperties: false,
	minProperties: 1
};
