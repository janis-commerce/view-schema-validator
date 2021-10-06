'use strict';

const commonSectionProperties = require('./sections/commonProperties');
const allSections = require('./sections');
const sectionsNames = require('./sectionsNames');
const { modifySchemaThenProperties } = require('../utils');

const sections = allSections.map(section => (
	modifySchemaThenProperties(section, {
		properties: commonSectionProperties
	})
));

const defaultSectionsNames = Object.values(sectionsNames);

/**
 * Make schema for sections property
 * @param {array} availableSections - available sections for property
 * @returns {object}
 */
const makeSections = (availableSections = defaultSectionsNames) => ({
	type: 'array',
	items: {
		type: 'object',
		properties: { rootComponent: { enum: availableSections } },
		allOf: sections
	},
	minItems: 1
});

module.exports = makeSections;
