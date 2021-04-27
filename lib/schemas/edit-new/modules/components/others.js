'use strict';

const { makeComponent } = require('../../../utils');
const names = require('../componentNames');

const {
	checkbox,
	colorPicker,
	switch: componentSwitch,
	text,
	textarea
} = names;

const commonProps = {
	properties: { autoComplete: { type: 'boolean' } }
};

const components = [
	{ name: componentSwitch, ...commonProps },
	{ name: checkbox, ...commonProps },
	{ name: textarea, ...commonProps },
	{ name: colorPicker },
	{ name: text }
];

module.exports = components.map(makeComponent);
