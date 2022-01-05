'use strict';

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
				label: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
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
				endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
				translateLabels: { type: 'boolean' },
				title: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
				listFields: {
					type: 'array',
					items: { type: 'string' },
					minItems: 1
				},
				viewMoreLink: { type: 'string' },
				viewMoreEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
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
