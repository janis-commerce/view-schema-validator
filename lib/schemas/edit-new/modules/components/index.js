'use strict';

const input = require('./input');
const multiInput = require('./multiInput');
const selects = require('./selects');
const chips = require('./chips');
const code = require('./code');
const dateTimePicker = require('./dateTimePicker');
const others = require('./others');
const link = require('./link');
const fieldsArray = require('./fieldsArray');
const checkList = require('./checkList');

module.exports = [
	selects,
	input,
	multiInput,
	code,
	link,
	dateTimePicker,
	fieldsArray,
	checkList,
	...chips,
	...others
];
