'use strict';

const { makeComponent } = require('../../../utils');
const { userSelector } = require('../componentNames');

module.exports = makeComponent({
	name: userSelector,
	properties: {
		isMulti: { type: 'boolean' },
		onlyActiveUsers: { type: 'boolean' },
		canCreate: { $ref: 'schemaDefinitions#/definitions/canCreate' },
		canClear: { type: 'boolean' },
		showImage: { type: 'boolean' },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' }
	}
});
