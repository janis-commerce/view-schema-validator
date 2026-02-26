'use strict';

const { makeComponent } = require('../utils');

const booleanType = { type: 'boolean' };

module.exports = makeComponent({
	name: 'Date',
	properties: {
		isRelative: booleanType,
		strict: booleanType,
		isDeliveryDate: booleanType,
		type: { type: 'string' }
	}
});
