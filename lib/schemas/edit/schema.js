'use strict';

const { properties, required, newEditSchema } = require('../edit-new/schema');
const themes = require('../common/themes');
const getEndpointParameters = require('../common/endpointParameters');

module.exports = {
	...newEditSchema,
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
				sourceEndpointParameters: getEndpointParameters()
			},
			required: ['source'],
			additionalProperties: false
		}
	},
	required: [...required]
};
