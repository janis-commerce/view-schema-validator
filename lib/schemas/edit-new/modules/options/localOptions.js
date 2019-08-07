'use strict';

module.exports = {
	if: {
		properties: {
			scope: { const: 'local' }
		}
	},
	then: {
		properties: {
			scope: { const: 'local' },
			values: {
				type: 'array',
				items: {
					anyOf: [
						{
							type: 'object',
							properties: {
								value: {
									anyOf: [
										{ type: 'string' },
										{ type: 'number' }
									]
								},
								label: { type: 'string' }
							},
							required: ['value', 'label'],
							additionalProperties: false
						},
						{ type: 'string' },
						{ type: 'number' }
					]
				}
			}
		},
		additionalProperties: false
	}
};
