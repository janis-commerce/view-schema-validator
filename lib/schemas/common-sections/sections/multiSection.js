'use strict';

const { multiSection, browseSection, remoteSection, formSection } = require('../sectionsNames');
const BrowseSection = require('./browseSection');
const RemoteSection = require('./remoteSection');
const FormSection = require('./formSection');
const commonSectionProperties = require('./commonProperties');
const { modifySchemaThenProperties } = require('../../utils');

const sectionsModified = [BrowseSection, RemoteSection, FormSection].map(section => (
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
			name: { type: 'string' },
			rootComponent: { type: 'string', const: multiSection },
			defaultSection: { type: 'string' },
			subSections: {
				type: 'array',
				items: {
					properties: {
						rootComponent: { enum: [browseSection, remoteSection, formSection] }
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
