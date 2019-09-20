'use strict';

const texts = require('./texts');
const chips = require('./chips');
const icon = require('./icon');
const images = require('./images');
const badgeLetter = require('./badgeLetter');
const actionButtons = require('./actionButtons');
const fieldList = require('./fieldList');
const color = require('./color');

module.exports = [
	...texts,
	...chips,
	...images,
	actionButtons,
	fieldList,
	icon,
	badgeLetter,
	color
];
