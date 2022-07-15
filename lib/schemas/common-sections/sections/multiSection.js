'use strict';

const { multiSection, browseSection, remoteSection } = require('../sectionsNames');
const BrowseSection = require('./browseSection');
const RemoteSection = require('./remoteSection');
const commonSectionProperties = require('./commonProperties');
const { modifySchemaThenProperties } = require('../../utils');

const sectionsModified = [BrowseSection, RemoteSection].map(section => (
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
						rootComponent: { enum: [browseSection, remoteSection] }
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
