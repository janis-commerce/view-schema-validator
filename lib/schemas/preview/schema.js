'use strict';

const { properties, required } = require('../common/base');
const themes = require('../common/themes');
const sections = require('./modules/sections');
const sectionNames = require('./modules/sectionsNames');
const editNewSections = require('../edit-new/modules/sections');
const commonSectionProperties = require('../edit-new/modules/sections/commonProperties');
const header = require('../edit-new/modules/headerProperties');
const { modifySchemaThenProperties } = require('../../schemas/utils');

const sectionsModified = [...editNewSections, ...sections].map(section => (
	modifySchemaThenProperties(section, {
		properties: commonSectionProperties
	})
));

module.exports = {
	type: 'object',
	properties: {
		...properties,
		root: { const: 'Preview' },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		sourceEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
		header,
		themes,
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
