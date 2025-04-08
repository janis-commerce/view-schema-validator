'use strict';

const linkProps = require('./linkProps');

module.exports = {
	type: 'object',
	properties: linkProps.properties,
	additionalProperties: false,
	required: ['path'],
	minProperties: 1
};
