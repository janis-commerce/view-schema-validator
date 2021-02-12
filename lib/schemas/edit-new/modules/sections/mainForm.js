'use strict';

const fieldsGroup = require('./components/fieldGroup');
const { mainForm } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: mainForm }
		}
	},
	then: {
		properties: {
			title: { type: 'string' },
			name: { type: 'string', const: 'mainFormSection' },
			rootComponent: { type: 'string', const: mainForm },
			fieldsGroup,
			hideUserCreated: { type: 'boolean' },
			hideUserModified: { type: 'boolean' }
		},
		required: ['name', 'rootComponent', 'fieldsGroup'],
		additionalProperties: false
	}
};
