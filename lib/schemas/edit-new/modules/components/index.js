'use strict';

const input = require('./input');
const multiInput = require('./multiInput');
const selects = require('./selects');
const others = require('./others');

module.exports = [
	selects,
	input,
	multiInput,
	...others
];
