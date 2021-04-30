'use strict';

const { makeComponent } = require('../../../utils');
const { location } = require('../componentNames');

module.exports = makeComponent({
	name: location,
	properties: {
		label: {
			oneOf: [
				{ type: 'string' },
				{
					type: 'object',
					properties: {
						template: { type: 'string' },
						fields: {
							type: 'array',
							items: { type: 'string' },
							minItems: 1
						}
					},
					required: ['template', 'fields'],
					additionalProperties: false
				}
			]
		},
		fieldsMapping: {
			type: 'object',
			properties: {
				latitude: { type: 'string' },
				longitude: { type: 'string' }
			},
			minProperties: 1,
			additionalProperties: false
		}
	},
	requiredProperties: ['label']
});
