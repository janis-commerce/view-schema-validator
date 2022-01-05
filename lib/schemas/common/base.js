'use strict';

module.exports = {
	properties: {
		root: { type: 'string' },
		service: { type: 'string' },
		name: { type: 'string' },
		title: { $ref: 'schemaDefinitions#/definitions/stringPrefix' }
	},
	required: ['root', 'name', 'service']
};
