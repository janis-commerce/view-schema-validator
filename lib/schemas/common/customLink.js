'use strict';

const link = require('./link');

module.exports = {
	type: 'object',
	properties: link.properties,
	additionalProperties: false,
	required: ['path'],
	minProperties: 1
};
