'use strict';

const field = require('./modules/field');

module.exports = {
	if: {
		properties: {
			root: { const: 'Browse' }
		}
	},
	then: {
		properties: {
			fields: {
				type: 'array',
				items: field,
				minItems: 1
			}
		},
		required: ['fields']
	}
};
