'use strict';

const getStaticFilters = require('../../common/staticFilters');

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
			properties: {
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
			},
			additionalProperties: false,
			required: ['source', 'listFields', 'title']
		}
	}
];

const interactionProperties = () => {
	const props = {
		type: 'object',
		oneof: interactionComponents
	};

	return {
		type: 'object',
		properties: {
			desktop: props,
			mobile: props,
			all: props
		},
		additionalProperties: false
	};
};

const interactions = {
	onHover: interactionProperties(),
	onClick: interactionProperties()
};

module.exports = interactions;
