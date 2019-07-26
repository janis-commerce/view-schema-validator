'use strict';

const componentNames = require('../componentNames');
const { makeComponent } = require('../../../utils');

const { text, boldText, mediumText, lightText } = componentNames;

const getProperties = defaultProp => ({
	fontWeight: {
		type: 'string',
		enum: ['light', 'normal', 'medium', 'bold'],
		default: defaultProp
	}
});

const textsComponents = [
	{
		name: text,
		properties: getProperties('normal')
	},
	{
		name: boldText,
		properties: getProperties('bold')
	},
	{
		name: mediumText,
		properties: getProperties('medium')
	},
	{
		name: lightText,
		properties: getProperties('light')
	}
];

module.exports = textsComponents.map(makeComponent);
