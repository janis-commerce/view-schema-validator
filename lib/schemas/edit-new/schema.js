'use strict';

const { properties, required } = require('../common/base');
const sections = require('./modules/sections');
const sectionNames = require('./modules/sectionsNames');
const { makeSection } = require('../../schemas/utils');
const commonSectionProperties = require('./modules/sections/commonProperties');

const sectionsModified = sections.map(section => (
	makeSection(section, {
		properties: commonSectionProperties
	})
));

module.exports = {
	type: 'object',
	properties: {
		...properties,
		target: {
			$ref: 'schemaDefinitions#/definitions/endpoint'
		},
		root: { enum: ['Edit', 'Create'] },
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
	required: [...required, 'sections', 'target']
};
