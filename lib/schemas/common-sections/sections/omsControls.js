'use strict';

const { omsControls } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: omsControls }
		}
	},
	then: {
		properties: {
			title: { type: 'string' },
			name: { type: 'string' },
			rootComponent: { type: 'string', const: omsControls }
		},
		required: ['name', 'rootComponent'],
		additionalProperties: false
	}
};
