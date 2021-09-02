'use strict';

const mapper = require('../../common/mapper');
const components = require('../../browse/modules/components');
const { text, chip, link, icon } = require('../../browse/modules/componentNames');

module.exports = {
	type: 'object',
	properties: {
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		previewSource: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
		sourceField: { type: 'string' },
		fields: {
			type: 'array',
			items: {
				type: 'object',
				properties: {
					name: { type: 'string' },
					component: { enum: [text, chip, link, icon] },
					mapper,
					componentAttributes: {
						type: 'object',
						default: {}
					}
				},
				allOf: components,
				minItems: 1
			}
		}
	},
	required: ['fields'],
	additionalProperties: false,
	minProperties: 1
};
