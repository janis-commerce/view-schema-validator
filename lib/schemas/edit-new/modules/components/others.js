'use strict';

const { makeComponent } = require('../../../utils');
const names = require('../componentNames');

const {
	checkbox,
	checkList,
	colorPicker,
	date,
	switch: componentSwitch,
	text,
	textarea,
	time
} = names;

const components = [
	{ name: checkbox },
	{ name: colorPicker },
	{ name: date },
	{ name: componentSwitch },
	{ name: text },
	{ name: textarea },
	{ name: time },
	{ name: checkList }
];

module.exports = components.map(makeComponent);
