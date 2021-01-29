'use strict';

const { multiSection, browseSection } = require('../sectionsNames');
const BrowseSection = require('./browseSection');
const commonSectionProperties = require('./commonProperties');
const { modifySchemaThenProperties } = require('../../../utils');

const sectionsModified = [BrowseSection].map(section => (
	modifySchemaThenProperties(section, {
		properties: commonSectionProperties
	})
));

module.exports = {
	if: {
		properties: {
			rootComponent: { const: multiSection }
		}
	},
	then: {
		properties: {
			title: { type: 'string' },
			name: { type: 'string' },
			rootComponent: { type: 'string', const: multiSection },
			defaultSection: { type: 'string' },
			subSections: {
				type: 'array',
				items: {
					properties: {
						rootComponent: { enum: [browseSection] }
					},
					allOf: sectionsModified
				},
				minItems: 1
			}
		},
		required: ['name', 'rootComponent', 'subSections'],
		additionalProperties: false
	}
};
