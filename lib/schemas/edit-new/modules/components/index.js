'use strict';

const input = require('./input');
const multiInput = require('./multiInput');
const selects = require('./selects');
const chips = require('./chips');
const code = require('./code');
const others = require('./others');
const link = require('./link');

module.exports = [
	selects,
	input,
	multiInput,
	code,
	link,
	...chips,
	...others
];
