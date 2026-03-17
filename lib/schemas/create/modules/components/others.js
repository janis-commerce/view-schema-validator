'use strict';

const { makeComponent } = require('../../../utils');
const names = require('../componentNames');

const {
	checkbox,
	colorPicker,
	switch: componentSwitch,
	textarea
} = names;

const commonProps = {
	properties: { autoComplete: { type: 'boolean' } }
};

const components = [
	{ name: componentSwitch, ...commonProps },
	{ name: checkbox, ...commonProps },
	{ name: textarea, ...commonProps },
	{ name: colorPicker }
];

module.exports = components.map(makeComponent);
