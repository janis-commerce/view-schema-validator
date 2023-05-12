'use strict';

const { properties, if: conditonal, then: isTrue, else: isFalse } = require('../edit-new/schema');
const themes = require('../common/themes');
const actions = require('../common/actions');
const remoteActions = require('../common/remoteActions');

module.exports = {
	properties: {
		...properties,
		themes,
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		canPrint: { type: 'boolean' },
		dependencies: { $ref: 'schemaDefinitions#/definitions/dependencies' },
		actions,
		remoteActions
	},
	allOf: [
		{
			if: conditonal,
			then: isTrue,
			else: isFalse
		},
		{
			if: {
				properties: { actions: { const: false } }
			},
			then: {
				not: {
					properties: { actions },
					required: ['actions']
				}
			},
			else: {
				not: {
					properties: { remoteActions },
					required: ['remoteActions']
				}
			}
		}
	]
};
