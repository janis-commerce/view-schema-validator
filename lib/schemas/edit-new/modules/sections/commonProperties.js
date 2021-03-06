'use strict';

const makeTopComponents = require('../../../common/topComponents');
const makeConditions = require('../../../common/conditions');

module.exports = {
	topComponents: makeTopComponents(),
	includeDataFrom: {
		type: 'array',
		items: { type: 'string' },
		minItems: 1
	},
	collapse: { type: 'boolean' },
	icon: { type: 'string' },
	conditions: makeConditions(false)
};
