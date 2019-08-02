'use strict';

const { makeComponent } = require('../../utils');

const filter = [
	{
		if: {
			properties: {
				component: { const: 'Input' }
			}
		},
		then: { type: 'object' }
	},
	makeComponent({
		name: 'Select',
		properties: {
			translateLabels: { type: 'boolean', default: true },
			options: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						label: { type: 'string' },
						value: {
							anyOf: [
								{ type: 'number' },
								{ type: 'string' },
								{ type: 'boolean' }
							]
						}
					},
					additionalProperties: false,
					required: ['label', 'value']
				}
			}
		}
	})
];

module.exports = filter;
