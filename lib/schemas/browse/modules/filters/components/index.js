'use strict';

const select = require('./select');
const multiselect = require('./multiselect');
const input = require('./input');
const dateTimePicker = require('./dateTimePicker');
const userSelector = require('./userSelector');
const statusSelector = require('./statusSelector');

module.exports = [
	select,
	multiselect,
	input,
	dateTimePicker,
	userSelector,
	statusSelector
];
