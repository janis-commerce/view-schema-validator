'use strict';

/**
 * Make object for if coditional into allOf property
 * @link https://json-schema.org/understanding-json-schema/reference/conditionals.html}
 * @name makeComponent
 * @param {object} component
 * @param {string} component.name
 * @param {object} component.properties
 * @param {array} component.requiredProperties
 */
const makeComponent = ({ name, properties = {}, requiredProperties = [] }) => {
	const componentAttributes = {
		type: 'object',
		properties,
		default: {},
		additionalProperties: false
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
			properties: { componentAttributes }
		}
	};

	return data;
};

module.exports = {
	makeComponent
};
