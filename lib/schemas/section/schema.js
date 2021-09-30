'use strict';

const sectionNames = require('./sectionsNames');
const { modifySchemaThenProperties } = require('../../schemas/utils');
const commonSectionProperties = require('../edit-new/modules/sections/commonProperties');
const editNewSections = require('../edit-new/modules/sections');
const previewSections = require('../preview/modules/sections');

const sectionsModified = [...editNewSections, ...previewSections].map(section => (
	modifySchemaThenProperties(section, {
		properties: commonSectionProperties
	})
));

module.exports = {
	type: 'object',
	properties: {
		rootComponent: { enum: Object.values(sectionNames) }
	},
	allOf: sectionsModified
};
