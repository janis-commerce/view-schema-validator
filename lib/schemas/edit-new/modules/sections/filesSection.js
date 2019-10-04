'use strict';

const { filesSection } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: filesSection }
		}
	},
	then: {
		properties: {
			title: { type: 'string' },
			name: { type: 'string' },
			rootComponent: { type: 'string', const: filesSection }
		},
		required: ['name', 'rootComponent'],
		additionalProperties: false
	}
};
