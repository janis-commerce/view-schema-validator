'use strict';

const { makeComponent } = require('../../../utils');

module.exports = makeComponent({
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
});
