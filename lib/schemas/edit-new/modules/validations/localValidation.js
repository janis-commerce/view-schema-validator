'use strict';

const validations = ['required', 'numeric', 'integer', 'positive', 'email'];

module.exports = {
	if: {
		properties: {
			name: { enum: validations }
		}
	},
	then: {
		properties: {
			name: { enum: validations }
		},
		required: ['name'],
		additionalProperties: false
	}
};
