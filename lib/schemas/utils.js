'use strict';

/**
 * Make object for if coditional into allOf property
 * @link https://json-schema.org/understanding-json-schema/reference/conditionals.html}
 * @name makeComponent
 * @param {object} component
 * @param {string} component.name
 * @param {object} component.properties
 * @param {object} component.conditions
 * @param {array} component.requiredProperties
 */
const makeComponent = ({ name, properties = {}, conditions = {}, requiredProperties = [] }) => {
	const componentAttributes = {
		...conditions,
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

/**
 * Make sections with additionals common properties
 * @param {Array} sections
 * @returns {function}
 */
const makeSections = sections => (
	/**
	 * @param {Object} component.properties
	 * @param {Array} component.narequiredProperties
	*/
	({ properties = {}, requiredProperties = [] }) => (
		sections.map(section => {
			const sectionModified = { ...section };
			const { properties: currentProperties, required } = sectionModified.then;

			if(Object.keys(properties).length)
				sectionModified.then.properties = { ...currentProperties, ...properties };

			if(required && requiredProperties.length)
				sectionModified.then.required = [...required, ...requiredProperties];

			return sectionModified;
		})
	)
);


module.exports = {
	makeComponent,
	makeSections
};
