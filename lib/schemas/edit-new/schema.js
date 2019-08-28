'use strict';

const { properties, required } = require('../common/base');
const sections = require('./modules/sections');
const actions = require('../common/actions');
const sectionNames = require('./modules/sectionsNames');
const { makeSection } = require('../../schemas/utils');

const sectionsModified = sections.map(section => (
	makeSection(section, {
		properties: {
			actions
		}
	})
));

module.exports = {
	type: 'object',
	properties: {
		...properties,
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
	required: [...required, 'sections']
};
