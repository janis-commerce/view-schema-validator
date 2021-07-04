'use strict';

const { makeComponent } = require('../../../../utils');
const { statusSelector } = require('../componentNames');

module.exports = makeComponent({
	name: statusSelector,
	properties: {
		values: {
			type: 'array',
			items: { type: 'string' },
			minItems: 1
		}
	}
});
