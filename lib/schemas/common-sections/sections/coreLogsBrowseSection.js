'use strict';

const { coreLogsBrowseSection } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: coreLogsBrowseSection }
		}
	},
	then: {
		properties: {
			name: { type: 'string' },
			rootComponent: { type: 'string', const: coreLogsBrowseSection }
		},
		required: ['name', 'rootComponent'],
		additionalProperties: false
	}
};
