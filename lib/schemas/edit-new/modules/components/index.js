'use strict';

const { link } = require('../../../common-components');
const input = require('./input');
const multiInput = require('./multiInput');
const selects = require('./selects');
const text = require('./text');
const chips = require('./chips');
const code = require('./code');
const dateTimePicker = require('./dateTimePicker');
const newDatePicker = require('./newDatePicker');
const others = require('./others');
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
const steps = require('./steps');

module.exports = [
	selects,
	selectMultilevel,
	input,
	multiInput,
	text,
	code,
	link,
	dateTimePicker,
	newDatePicker,
	fieldsArray,
	checkList,
	asyncWrapper,
	map,
	html,
	steps,
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
