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
				afterId: commonAfterBefore,
				beforeId: commonAfterBefore
			},
			minProperties: 1,
			additionalProperties: false
		}
	},
	minProperties: 1,
	additionalProperties: false
};
