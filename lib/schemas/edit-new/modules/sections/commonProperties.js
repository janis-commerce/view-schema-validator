'use strict';

const topComponents = require('./components/topComponents');
const makeConditions = require('../../../common/conditions');

module.exports = {
	topComponents,
	includeDataFrom: {
		type: 'array',
		items: { type: 'string' },
		minItems: 1
	},
	collapse: { type: 'boolean' },
	icon: { type: 'string' },
	conditions: makeConditions(false)
};
