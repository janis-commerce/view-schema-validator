'use strict';

const input = require('./input');
const multiInput = require('./multiInput');
const selects = require('./selects');
const chips = require('./chips');
const code = require('./code');
const others = require('./others');

module.exports = [
	selects,
	input,
	multiInput,
	code,
	...chips,
	...others
];
