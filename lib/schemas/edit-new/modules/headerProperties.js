'use strict';

const components = require('../../browse/modules/components');
const mapper = require('../../common/mapper');
const { badgeLetter, statusChip } = require('../../browse/modules/componentNames');
const { makeComponent } = require('../../utils');

const identifier = {
	oneOf: [
		{ type: 'string' },
		{
			type: 'array',
			items: { type: 'string' },
			minItems: 1
		},
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
};

const additionalComponents = [
	{ name: 'IdText' },
	{
		name: 'DefaultTitle',
		properties: { identifier }
	},
	{
		name: 'CustomTitle',
		properties: {
			value: { type: 'string' },
			color: { type: 'string' }
		},
		requiredProperties: ['value']
	},
	{
		name: 'MainTitle',
		properties: {
			identifier,
			value: { type: 'string' },
			color: { type: 'string' }
		}
	}
].map(makeComponent);


const componentsProps = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			component: {
				enum: [
					badgeLetter,
					statusChip,
					'IdText',
					'DefaultTitle',
					'CustomTitle',
					'MainTitle'
				]
			},
			mapper,
			componentAttributes: {
				type: 'object',
				default: {}
			}
		},
		allOf: [...components, ...additionalComponents],
		minItems: 1
	}
};

module.exports = {
	type: 'object',
	properties: {
		title: {
			oneOf: [
				componentsProps,
				{
					type: 'object',
					properties: {
						hideTitle: { type: 'boolean' },
						components: componentsProps,
						afterId: componentsProps,
						beforeId: componentsProps,
						identifier
					},
					minProperties: 1,
					additionalProperties: false
				}
			]
		}
	},
	minProperties: 1,
	additionalProperties: false
};
