'use strict';

const { comments } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: comments }
		}
	},
	then: {
		properties: {
			name: { type: 'string' },
			rootComponent: { type: 'string', const: comments }
		},
		required: ['name', 'rootComponent'],
		additionalProperties: false
	}
};
