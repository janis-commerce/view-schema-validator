'use strict';

const { properties, required } = require('../common/base');
const makeSections = require('../common-sections');
const sectionNames = require('./modules/sectionsNames');
const header = require('./modules/headerProperties');
const redirect = require('../common/redirect');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		redirect,
		header,
		saveRedirectUrl: { type: 'string' },
		cancelRedirectUrl: { type: 'string' },
		target: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		root: { enum: ['Edit', 'Create'] },
		canCreate: { type: 'boolean' },
		collapseSections: { type: 'boolean' },
		sections: makeSections(sectionNames)
	},
	if: {
		properties: {
			redirect: { $ref: 'schemaDefinitions#/definitions/redirect' }
		}
	},
	then: {
		required: [...required]
	},
	else: {
		additionalProperties: false,
		required: [...required, 'sections']
	}
};
