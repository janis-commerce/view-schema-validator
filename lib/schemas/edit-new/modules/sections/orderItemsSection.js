'use strict';

const { orderItemsSection } = require('../sectionsNames');
const getStaticFilters = require('../../../common/staticFilters');

const commonProps = {
	properties: {
		title: { type: 'string' },
		name: { type: 'string' },
		rootComponent: { type: 'string', const: orderItemsSection },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		sourceField: { type: 'string' },
		staticFilters: getStaticFilters()
	},
	required: ['name', 'rootComponent'],
	additionalProperties: false
};

module.exports = {
	if: {
		properties: {
			rootComponent: { const: orderItemsSection }
		}
	},
	then: {
		if: {
			properties: {
				source: false,
				sourceField: false
			}
		},
		then: {
			...commonProps,
			required: [
				...commonProps.required,
				'source',
				'sourceField'
			]
		},
		else: commonProps
	}
};
