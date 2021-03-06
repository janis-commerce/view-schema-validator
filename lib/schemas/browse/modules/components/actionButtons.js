'use strict';

const { makeComponent } = require('../../../utils');
const { actionButtons } = require('../componentNames');
const action = require('../../../common/actions/action');
const makeActionCallbacks = require('../../../common/actionCallbacks');

const customCallbacks = ['removeRow', 'reloadRow', 'reloadBrowse'];

const customAction = {
	...action,
	properties: {
		...action.properties,
		callback: makeActionCallbacks({ customCallbacks })
	}
};

module.exports = makeComponent({
	name: actionButtons,
	properties: {
		actionsData: {
			type: 'array',
			items: customAction,
			minItems: 1
		}
	},
	requiredProperties: ['actionsData']
});
