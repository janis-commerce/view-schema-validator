'use strict';

module.exports = {
	if: {
		properties: {
			name: { const: 'literal' }
		}
	},
	then: {
		properties: {
			name: { const: 'literal' },
			options: {
				type: 'object',
				properties: {
					value: {
						anyOf: [
							{ type: 'string' },
							{ type: 'number' }
						]
					}
				},
				required: ['value'],
				additionalProperties: false
			}
		},
		additionalProperties: false,
		required: ['name', 'options']
	}
};
