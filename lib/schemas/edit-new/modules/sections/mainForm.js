'use strict';

const fieldsGroup = require('./fieldGroup');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: 'MainForm' }
		}
	},
	then: {
		properties: {
			title: { type: 'string' },
			name: { type: 'string', const: 'mainFormSection' },
			rootComponent: { type: 'string', const: 'MainForm' },
			fieldsGroup
		},
		required: ['name', 'rootComponent', 'fieldsGroup'],
		additionalProperties: false
	}
};
