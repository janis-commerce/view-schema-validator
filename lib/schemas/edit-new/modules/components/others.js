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

const components = [
	{ name: checkbox },
	{ name: colorPicker },
	{ name: componentSwitch },
	{ name: text },
	{ name: textarea }
];

module.exports = components.map(makeComponent);
