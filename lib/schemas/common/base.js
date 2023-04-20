'use strict';

const redirect = require('../common/redirect');

module.exports = {
	properties: {
		root: { type: 'string' },
		service: { type: 'string' },
		name: { type: 'string' },
		title: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		redirect
	},
	required: ['root', 'name', 'service']
};
