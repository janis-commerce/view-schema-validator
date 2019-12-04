'use strict';

const texts = require('./texts');
const chips = require('./chips');
const icon = require('./icon');
const images = require('./images');
const badgeLetter = require('./badgeLetter');
const actionButtons = require('./actionButtons');
const fieldList = require('./fieldList');
const color = require('./color');
const sacClaimChange = require('./sacClaimChange');
const link = require('./link');
const asyncWrapper = require('./asyncWrapper');

module.exports = [
	...texts,
	...chips,
	...images,
	actionButtons,
	fieldList,
	icon,
	badgeLetter,
	color,
	sacClaimChange,
	link,
	asyncWrapper
];
