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
const asyncWrapper = require('./asyncWrapper');
const selectMultilevel = require('./selectMultilevel');
const map = require('./map');
const html = require('./html');
const userSelector = require('./userSelector');

module.exports = [
	selects,
	selectMultilevel,
	input,
	multiInput,
	code,
	link,
	dateTimePicker,
	fieldsArray,
	checkList,
	asyncWrapper,
	map,
	html,
	userSelector,
	...chips,
	...others
];
