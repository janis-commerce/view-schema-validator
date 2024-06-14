'use strict';

const { properties, required } = require('../common/base');
const filters = require('../browse/modules/filters');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		canRefresh: { type: 'boolean' },
		filters
	},
	additionalProperties: false,
	required
};
