'use strict';

const getEndpointParameters = require('../../common/endpointParameters');
const mapper = require('../../common/mapper');

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
				translateLabels: { type: 'boolean' },
				mapper
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
				endpointParameters: getEndpointParameters(),
				translateLabels: { type: 'boolean' },
				title: { type: 'string' },
				listFields: {
					type: 'array',
					items: { type: 'string' },
					minItems: 1
				},
				viewMoreLink: { type: 'string' },
				viewMoreEndpointParameters: getEndpointParameters()
			},
			additionalProperties: false,
			required: ['source', 'listFields', 'title']
		}
	}
];

const interactionProperties = () => {
	const props = {
		type: 'object',
		allOf: interactionComponents
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
