'use strict';

const components = require('../../browse/modules/components');
const mapper = require('../../common/mapper');
const { badgeLetter, statusChip } = require('../../browse/modules/componentNames');

const commonAfterBefore = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			component: { enum: [badgeLetter, statusChip] },
			mapper,
			componentAttributes: {
				type: 'object',
				default: {}
			}
		},
		allOf: components,
		minItems: 1
	}
};

module.exports = {
	type: 'object',
	properties: {
		title: {
			type: 'object',
			properties: {
				hideTitle: { type: 'boolean' },
				afterId: commonAfterBefore,
				beforeId: commonAfterBefore,
				identifier: {
					oneOf: [
						{ type: 'string' },
						{
							type: 'object',
							properties: {
								template: { type: 'string' },
								fields: {
									type: 'array',
									items: {
										type: 'string'
									},
									minItems: 1
								}
							},
							required: ['template', 'fields'],
							additionalProperties: false
						}
					]
				}
			},
			minProperties: 1,
			additionalProperties: false
		}
	},
	minProperties: 1,
	additionalProperties: false
};
