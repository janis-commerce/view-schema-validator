'use strict';

const { makeComponent } = require('../../../utils');
const { statusSelector } = require('../componentNames');
const getCanCreateProps = require('../can-create');

module.exports = makeComponent({
	name: statusSelector,
	properties: {
		canClear: { type: 'boolean' },
		canCreate: getCanCreateProps(),
		values: {
			type: 'array',
			items: { type: 'string' },
			minItems: 1
		}
	}
});
