'use strict';

const { properties, required } = require('../common/base');
const makeSections = require('../common-sections');
const sectionNames = require('./modules/sectionsNames');
const header = require('./modules/headerProperties');
const getCanCreateProps = require('./modules/can-create');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		header,
		saveRedirectUrl: { type: 'string' },
		cancelRedirectUrl: { type: 'string' },
		target: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		root: { enum: ['Edit', 'Create'] },
		canCreate: getCanCreateProps(),
		collapseSections: { type: 'boolean' },
		sections: makeSections(sectionNames)
	},
	if: {
		properties: {
			redirect: {
				const: false
			}
		}
	},
	then: {
		required: [...required, 'sections']
	},
	else: {
		required: [...required]
	},
	additionalProperties: false
};
