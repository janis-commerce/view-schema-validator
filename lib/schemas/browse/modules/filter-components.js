/* 'use strict';

const filterAttributesStructByComponent = {
	allOf: [
		{
			if: {
				properties: {
					component: { const: 'Input' }
				}
			},
			then: {
				type: 'object'
			}
		}
	],
	Select: struct({
		translateLabels: 'boolean',
		options: struct.optional([struct.union([{
			label: 'string',
			value: 'string|number|boolean'
		}, 'string|number|boolean'])])
	}, {})
};

module.exports = {
	filterAttributesStructByComponent,
	filterComponentNames: Object.keys(filterAttributesStructByComponent)
};
 */
