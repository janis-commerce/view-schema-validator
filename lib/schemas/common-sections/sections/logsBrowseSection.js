'use strict';

const { logsBrowseSection } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: logsBrowseSection }
		}
	},
	then: {
		properties: {
			name: { type: 'string' },
			rootComponent: { type: 'string', const: logsBrowseSection }
		},
		required: ['name', 'rootComponent'],
		additionalProperties: false
	}
};
