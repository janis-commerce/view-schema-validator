'use strict';

const { makeComponent } = require('../../../utils');
const { statusSelector } = require('../componentNames');

module.exports = makeComponent({
	name: statusSelector,
	properties: {
		canClear: { type: 'boolean' },
		canCreate: { $ref: 'schemaDefinitions#/definitions/canCreateProps' },
		values: {
			type: 'array',
			items: { type: 'string' },
			minItems: 1
		}
	}
});
