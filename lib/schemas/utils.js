'use strict';

const makeComponent = ({ name, properties = {}, requiredProperties = [] }) => {
	const componentAttributes = {
		type: 'object',
		properties,
		default: {}
	};

	if(requiredProperties.length)
		componentAttributes.required = [...requiredProperties];

	const data = {
		if: {
			properties: {
				component: Array.isArray(name) ? { enum: [...name] } : { const: name }
			}
		},
		then: {
			properties: {
				componentAttributes
			}
		}
	};

	return data;
};

module.exports = {
	makeComponent
};
