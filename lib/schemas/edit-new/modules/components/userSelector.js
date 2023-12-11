'use strict';

const { makeComponent } = require('../../../utils');
const { userSelector } = require('../componentNames');
const getCanCreateProps = require('../can-create');

module.exports = makeComponent({
	name: userSelector,
	properties: {
		isMulti: { type: 'boolean' },
		onlyActiveUsers: { type: 'boolean' },
		canCreate: getCanCreateProps(),
		canClear: { type: 'boolean' },
		showImage: { type: 'boolean' },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' }
	}
});
