'use strict';

const select = require('./select');
const input = require('./input');
const dateTimePicker = require('./dateTimePicker');
const userSelector = require('./userSelector');
const statusSelector = require('./statusSelector');

module.exports = [
	select,
	input,
	dateTimePicker,
	userSelector,
	statusSelector
];
