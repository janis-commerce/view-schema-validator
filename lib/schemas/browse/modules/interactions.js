'use strict';

const getStaticFilters = require('../../common/staticFilters');

const listComponentProperties = {
	type: { enum: ['ListTooltip', 'ListModal'] },
	source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
	translateLabels: { type: 'boolean' },
	title: { type: 'string' },
	listFields: {
		type: 'array',
		items: { type: 'string' },
		minItems: 1
	},
	viewMoreLink: { type: 'string' },
	viewMoreEndpointParameters: getStaticFilters()
};

const interactionComponents = [
	{
		if: {
			properties: {
				type: { const: 'Tooltip' }
			}
		},
		then: {
			properties: {
				type: { const: 'Tooltip' },
				label: { type: 'string' },
				translateLabels: { type: 'boolean' }
			},
			additionalProperties: false,
			required: ['label']
		}
	},
	{
		if: {
			properties: {
				type: { enum: ['ListTooltip', 'ListModal'] }
			}
		},
		then: {
			properties: listComponentProperties,
			additionalProperties: false,
			required: ['source', 'listFields', 'title']
		}
	}
];

const interactionProperties = {
	desktop: {
		type: 'object',
		allOf: interactionComponents
	},
	mobile: {
		type: 'object',
		allOf: interactionComponents
	},
	all: {
		type: 'object',
		allOf: interactionComponents
	}
};

const interactions = {
	onHover: {
		type: 'object',
		properties: interactionProperties,
		additionalProperties: false
	},
	onClick: {
		type: 'object',
		properties: interactionProperties,
		additionalProperties: false
	}
};

module.exports = interactions;
