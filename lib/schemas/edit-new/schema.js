'use strict';

const { properties, required } = require('../common/base');
const sections = require('./modules/sections');
const sectionNames = require('./modules/sectionsNames');
const { modifySchemaThenProperties } = require('../../schemas/utils');
const commonSectionProperties = require('./modules/sections/commonProperties');
const header = require('./modules/headerProperties');

const sectionsModified = sections.map(section => (
	modifySchemaThenProperties(section, {
		properties: commonSectionProperties
	})
));

module.exports = {
	type: 'object',
	properties: {
		...properties,
		saveRedirectUrl: { type: 'string' },
		cancelRedirectUrl: { type: 'string' },
		target: {
			$ref: 'schemaDefinitions#/definitions/endpoint'
		},
		root: { enum: ['Edit', 'Create'] },
		canCreate: { type: 'boolean' },
		header,
		collapseSections: { type: 'boolean' },
		sections: {
			type: 'array',
			items: {
				properties: {
					rootComponent: { enum: Object.values(sectionNames) }
				},
				allOf: sectionsModified
			},
			minItems: 1
		}
	},
	additionalProperties: false,
	required: [...required, 'sections']
};
