'use strict';

const action = require('../../../../common/actions/action');
const makeConditions = require('../../../../common/conditions');
const getStaticFilters = require('../../../../common/staticFilters');

const availableCallbacks = ['reloadSectionData', 'refresh'];

const customAction = {
	...action,
	properties: {
		...action.properties,
		conditions: makeConditions(),
		callback: {
			enum: availableCallbacks
		}
	}
};

const commonProperties = {
	position: {
		type: 'string',
		enum: ['left', 'right']
	},
	attributes: {
		type: 'object',
		additionalProperties: true
	},
	conditions: makeConditions()
};


module.exports = {
	type: 'array',
	items: {
		type: 'object',
		properties: {
			component: { type: 'string' }
		},
		allOf: [
			{
				if: {
					properties: {
						component: { const: 'ActionButtons' }
					}
				},
				then: {
					properties: {
						component: { const: 'ActionButtons' },
						actions: {
							type: 'array',
							items: customAction
						},
						...commonProperties
					},
					additionalProperties: false,
					required: ['actions', 'component']
				}
			},
			{
				if: {
					properties: {
						component: { const: 'ActionForm' }
					}
				},
				then: {
					properties: {
						component: { const: 'ActionForm' },
						name: { type: 'string' },
						fields: {
							type: 'array',
							items: {
								$ref: 'schemaDefinitions#/definitions/editNewField'
							},
							minItems: 1
						},
						target: { $ref: 'schemaDefinitions#/definitions/endpoint' },
						targetEndpointParameters: getStaticFilters(),
						...commonProperties
					},
					additionalProperties: false,
					required: ['name', 'fields', 'target']
				}
			},
			{
				if: {
					properties: {
						component: {
							not: { enum: ['ActionButtons', 'ActionForm'] }
						}
					}
				},
				then: {
					properties: {
						component: { type: 'string' },
						...commonProperties
					},
					additionalProperties: false,
					required: ['component']
				}
			}
		]
	},
	minItems: 1
};
