'use strict';

const { properties, required, newEditSchema } = require('../edit-new/schema');
const themes = require('../common/themes');
const getStaticFilters = require('../common/staticFilters');

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
				sourceEndpointParameters: getStaticFilters()
			},
			required: ['source'],
			additionalProperties: false
		}
	},
	required: [...required]
};
