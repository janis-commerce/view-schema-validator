'use strict';

const {
	texts,
	chips,
	icon,
	images,
	actionButtons,
	fieldList,
	badgeLetter
} = require('./components');

const components = [
	...texts,
	...chips,
	...images,
	actionButtons,
	fieldList,
	icon,
	badgeLetter
];


module.exports = components;
