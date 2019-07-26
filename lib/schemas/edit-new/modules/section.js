'use strict';

const Field = require('./field');

const fields = {
	type: 'array',
	items: [Field],
	minItems: 1
};

const fieldsGroup = {
	type: 'array',
	items: [{
		properties: {
			name: { type: 'string' },
			icon: { type: 'string' },
			fields
		}
	}],
	minItems: 1
};


// Basic Information Form
const MainFormSection = {
	properties: {
		title: { type: 'string' },
		name: { type: 'string', enum: ['mainFormSection'] },
		rootComponent: { type: 'string', enum: ['MainForm'] },
		fieldsGroup
	},
	required: ['name', 'rootComponent', 'fieldsGroup']
};

module.exports = {
	anyOf: [
		MainFormSection
	]
};
