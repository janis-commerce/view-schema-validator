'use strict';

const { makeComponent } = require('../../../utils');
const names = require('../componentNames');

const {
	checkbox,
	checkList,
	color,
	link,
	switch: componentSwitch,
	text,
	textarea
} = names;

const components = [
	{ name: checkbox },
	{ name: color },
	{ name: link },
	{ name: componentSwitch },
	{ name: text },
	{ name: textarea },
	{ name: checkList }
];

module.exports = components.map(makeComponent);
