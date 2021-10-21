'use strict';

const { properties, required } = require('../edit-new/schema');
const themes = require('../common/themes');

module.exports = {
	properties: {
		...properties,
		themes,
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		canPrint: { type: 'boolean' },
		remoteActions: {
			type: 'object',
			properties: {
				title: { type: 'string' },
				translateTitle: { type: 'boolean' },
				source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
				sourceEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
			},
			required: ['source'],
			additionalProperties: false
		}
	},
	required: [...required]
};
