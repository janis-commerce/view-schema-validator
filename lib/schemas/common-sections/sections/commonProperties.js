'use strict';

const makeTopComponents = require('../../common/topComponents');
const makeConditions = require('../../common/conditions');
const themes = require('../../common/themes');

module.exports = {
	topComponents: makeTopComponents(),
	includeDataFrom: {
		type: 'array',
		items: { type: 'string' },
		minItems: 1
	},
	collapse: { type: 'boolean' },
	icon: { type: 'string' },
	conditions: makeConditions(false),
	themes
};
