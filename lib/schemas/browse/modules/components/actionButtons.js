'use strict';

const { makeComponent } = require('../../../utils');
const { actionButtons } = require('../componentNames');
const action = require('../../../common/actions/action');

const availableCallbacks = ['removeRow', 'refresh'];

const customAction = {
	...action,
	properties: {
		...action.properties,
		callback: {
			enum: availableCallbacks
		}
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
