'use strict';

const { properties, required } = require('../common/base');
const sections = require('./modules/sections');
const actions = require('../common/actions');
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
					rootComponent: { enum: Object.values(sectionNames) }
				},
				allOf: sections({
					properties: {
						actions
					}
				})
			},
			minItems: 1
		}
	},
	additionalProperties: false,
	required: [...required, 'sections']
};
