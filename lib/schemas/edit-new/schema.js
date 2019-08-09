'use strict';

const sections = require('./modules/sections');
const { properties, required } = require('../common/base');
const sectionNames = require('./modules/sectionsNames');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		root: { enum: ['Edit', 'Create'] },
		sections: {
			type: 'array',
			items: {
				properties: {
					rootComponent: { enum: sectionNames }
				},
				allOf: sections
			},
			minItems: 1
		}
	},
	additionalProperties: false,
	required: [...required, 'sections']
};
