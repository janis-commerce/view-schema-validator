'use strict';

const input = require('./input');
const multiInput = require('./multiInput');
const selects = require('./selects');
const chips = require('./chips');
const dateTimePicker = require('./dateTimePicker');
const others = require('./others');

module.exports = [
	selects,
	input,
	multiInput,
	dateTimePicker,
	...chips,
	...others
];
