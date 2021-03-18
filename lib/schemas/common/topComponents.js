'use strict';

const action = require('./actions/action');
const makeConditions = require('./conditions');
const makeActionCallbacks = require('./actionCallbacks');

const conditions = makeConditions();

const makeCustomAction = isBrowsePage => ({
	...action,
	properties: {
		...action.properties,
		conditions,
		callback: makeActionCallbacks({ isBrowsePage })
	}
});

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
	conditions
};

/** Top components with especial properties */
const specialTopComponents = {
	actionButtons: 'ActionButtons',
	actionForm: 'ActionForm'
};

const makeTopComponents = (isBrowsePage = false) => ({
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
							items: makeCustomAction(isBrowsePage)
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
						targetEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
						callback: makeActionCallbacks({ isBrowsePage }),
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
});

module.exports = makeTopComponents;
