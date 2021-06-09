'use strict';

const { makeComponent } = require('../../../utils');
const { statusSelector } = require('../componentNames');

module.exports = makeComponent({
	name: statusSelector,
	properties: {
		canClear: { type: 'boolean' },
		creatable: { type: 'boolean' },
		values: {
			type: 'array',
			items: { type: 'string' },
			minItems: 1
		}
	}
});
