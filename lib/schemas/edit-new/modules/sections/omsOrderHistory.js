'use strict';

const { omsOrderHistory } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: omsOrderHistory }
		}
	},
	then: {
		properties: {
			title: { type: 'string' },
			name: { type: 'string' },
			rootComponent: { type: 'string', const: omsOrderHistory },
			milestones: {
				type: 'object',
				additionalProperties: {
					type: 'object',
					properties: {
						component: { type: 'string' },
						fields: {
							type: 'array',
							items: {
								type: 'object',
								properties: {
									name: { type: 'string' },
									component: { type: 'string' }
								},
								required: ['name', 'component']
							},
							minItems: 1
						}
					},
					required: ['component'],
					additionalProperties: false
				}
			}
		},
		required: ['name', 'rootComponent', 'milestones'],
		additionalProperties: false
	}
};
