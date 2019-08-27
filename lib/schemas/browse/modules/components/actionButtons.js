'use strict';

const { makeComponent } = require('../../../utils');
const { actionButtons } = require('../componentNames');
const action = require('../../../common/actions/action');

module.exports = makeComponent({
	name: actionButtons,
	properties: {
		actionsData: {
			type: 'array',
			items: action,
			minItems: 1
		}
	},
	requiredProperties: ['actionsData']
});
