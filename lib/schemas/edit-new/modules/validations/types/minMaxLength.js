'use strict';

const validations = ['minLength', 'maxLength'];

module.exports = {
	if: {
		properties: {
			name: { enum: validations }
		}
	},
	then: {
		properties: {
			name: { enum: validations },
			options: {
				type: 'object',
				properties: {
					length: { type: 'number' }
				},
				required: ['length'],
				additionalProperties: false
			}
		},
		required: ['name', 'options'],
		additionalProperties: false
	}
};
