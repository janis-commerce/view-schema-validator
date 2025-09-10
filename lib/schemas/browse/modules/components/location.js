'use strict';

const { makeComponent } = require('../../../utils');
const { location } = require('../componentNames');

module.exports = makeComponent({
	name: location,
	properties: {
		label: {
			oneOf: [
				{ type: 'string' },
				{ $ref: 'schemaDefinitions#/definitions/template' }
			]
		},
		modalSize: { $ref: 'schemaDefinitions#/definitions/modalSize' },
		fieldsMapping: {
			type: 'object',
			properties: {
				latitude: { type: 'string' },
				longitude: { type: 'string' }
			},
			minProperties: 2,
			additionalProperties: false
		},
		verifiedAddressField: {
			type: 'string'
		}
	},
	requiredProperties: ['label']
});
