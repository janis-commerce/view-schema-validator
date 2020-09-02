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

/** Common properties for TopComponent */
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

/** Top components with especial properties */
const specialTopComponents = {
	actionButtons: 'ActionButtons',
	actionForm: 'ActionForm'
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
						component: { const: specialTopComponents.actionButtons }
					}
				},
				then: {
					properties: {
						component: { const: specialTopComponents.actionButtons },
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
						component: { const: specialTopComponents.actionForm }
					}
				},
				then: {
					properties: {
						component: { const: specialTopComponents.actionForm },
						name: { type: 'string' },
						title: { type: 'string' },
						icon: { type: 'string' },
						iconColor: { type: 'string' },
						color: { type: 'string' },
						backgroundColor: { type: 'string' },
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
					required: ['component', 'name', 'fields', 'target']
				}
			},
			{
				if: {
					properties: {
						component: {
							not: { enum: Object.values(specialTopComponents) }
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
