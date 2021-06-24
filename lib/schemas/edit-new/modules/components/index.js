'use strict';

const input = require('./input');
const multiInput = require('./multiInput');
const selects = require('./selects');
const text = require('./text');
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
const images = require('./images');
const iconSelector = require('./iconSelector');
const preview = require('./preview');
const selectForm = require('./selectForm');
const objectCreator = require('./objectCreator');
const location = require('./location');
const statusSelector = require('./statusSelector');

module.exports = [
	selects,
	selectMultilevel,
	input,
	multiInput,
	text,
	code,
	link,
	dateTimePicker,
	fieldsArray,
	checkList,
	asyncWrapper,
	map,
	html,
	userSelector,
	iconSelector,
	statusSelector,
	preview,
	selectForm,
	objectCreator,
	location,
	...images,
	...chips,
	...others
];
