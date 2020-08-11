'use strict';

const { makeComponent } = require('../../../utils');
const { asyncUserChip } = require('../componentNames');

module.exports = makeComponent({
	name: asyncUserChip,
	properties: {
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' }
	}
});
