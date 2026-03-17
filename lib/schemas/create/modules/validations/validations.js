'use strict';

const validationsTypes = require('./types');
const names = require('./names');

module.exports = {
	type: 'array',
	items: {
		type: 'array',
		items: {
			type: 'object',
			properties: {
				name: { enum: names }
			},
			allOf: validationsTypes
		},
		minItems: 1
	}
};
