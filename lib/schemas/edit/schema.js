'use strict';

const { properties, if: conditonal, then: isTrue, else: isFalse } = require('../edit-new/schema');
const themes = require('../common/themes');

module.exports = {
	properties: {
		...properties,
		themes,
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		canPrint: { type: 'boolean' },
		dependencies: { $ref: 'schemaDefinitions#/definitions/dependencies' },
		remoteActions: {
			type: 'object',
			properties: {
				title: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
				translateTitle: { type: 'boolean' },
				source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
				sourceEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
				modalSize: { $ref: 'schemaDefinitions#/definitions/modalSize' }
			},
			required: ['source'],
			additionalProperties: false
		}
	},
	if: conditonal,
	then: isTrue,
	else: isFalse
};
