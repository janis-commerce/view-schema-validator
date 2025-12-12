'use strict';

const mapper = require('../../common/mapper');
const makeConditions = require('../../common/conditions');

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
				sourceField: { type: 'string' },
				translateLabels: { type: 'boolean' },
				conditions: makeConditions(false),
				mapper
			},
			additionalProperties: false
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
				sourceField: { type: 'string' },
				source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
				endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
				translateLabels: { type: 'boolean' },
				title: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
				conditions: makeConditions(false),
				listFields: {
					type: 'array',
					items: { type: 'string' },
					minItems: 1
				},
				viewMoreLink: { type: 'string' },
				viewMoreEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
			},
			additionalProperties: false,
			required: ['listFields', 'title']
		}
	},
	{
		if: {
			properties: {
				type: { const: 'ErrorActionsModal' }
			}
		},
		then: {
			properties: {
				type: { const: 'ErrorActionsModal' }
			},
			additionalProperties: false
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
