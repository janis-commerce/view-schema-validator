'use strict';

const section = require('./modules/section');

module.exports = {
	if: {
		properties: {
			root: { enum: ['Edit', 'New'] }
		}
	},
	then: {
		properties: {
			sections: {
				type: 'array',
				items: [section],
				minItems: 1
			}
		},
		required: ['sections']
	}
};
