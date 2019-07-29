'use strict';

const section = require('./modules/section');
const { properties, required } = require('../common/base');

module.exports = {
	type: 'object',
	properties: {
		...properties,
		root: { enum: ['Edit', 'New'] },
		sections: {
			type: 'array',
			items: [section],
			minItems: 1
		}
	},
	additionalProperties: false,
	required: [...required, 'sections']
};
