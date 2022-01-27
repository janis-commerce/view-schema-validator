'use strict';

const action = require('./action');
const makeConditions = require('../../common/conditions');
const makeActionCallbacks = require('../../common/actionCallbacks');

const conditions = makeConditions();

module.exports = ({ isBrowsePage, customCallbacks }) => ({
	type: 'array',
	items: {
		...action,
		properties: {
			...action.properties,
			conditions,
			callback: makeActionCallbacks({ isBrowsePage, customCallbacks })
		}
	}
});
