'use strict';

const { link, location } = require('../../../common-components');
const texts = require('./texts');
const chips = require('./chips');
const icon = require('./icon');
const images = require('./images');
const badgeLetter = require('./badgeLetter');
const actionButtons = require('./actionButtons');
const fieldList = require('./fieldList');
const color = require('./color');
const sacClaimChange = require('./sacClaimChange');
const csxClaimChange = require('./csxClaimChange');
const asyncWrapper = require('./asyncWrapper');
const multiValueWrapper = require('./multiValueWrapper');
const asyncUserChip = require('./asyncUserChip');
const countDown = require('./countDown');

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
	csxClaimChange,
	link,
	asyncWrapper,
	multiValueWrapper,
	asyncUserChip,
	countDown,
	location
];
