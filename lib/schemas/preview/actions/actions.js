'use strict';

const action = require('./action');
const makeConditions = require('../../common/conditions');
const makeActionCallbacks = require('../../common/actionCallbacks');

const conditions = makeConditions();

const customCallbacks = ['removeRow', 'reloadRow', 'reloadBrowse'];

const makeCustomAction = isBrowsePage => ({
	...action,
	properties: {
		...action.properties,
		conditions,
		callback: makeActionCallbacks({ isBrowsePage, customCallbacks })
	}
});

module.exports = {
	type: 'array',
	items: makeCustomAction(true)
};
