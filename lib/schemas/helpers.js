'use strict';

const {
	properties: baseProperties,
	required: baseRequired
} = require('./common/base');

/**
 * Create a view schema definition with common base properties.
 *
 * @param {object} options
 * @param {string|string[]} options.root - The root type(s) this schema supports
 * @param {object} [options.properties={}] - Additional properties beyond the base
 * @param {string[]} [options.additionalRequired=[]] - Additional required fields beyond base
 * @param {boolean} [options.additionalProperties=false] - Whether to allow additional properties
 * @param {object} [options.conditional] - Optional if/then/else for conditional requirements
 * @returns {object} A JSON Schema object
 */
function defineViewSchema({
	root,
	properties = {},
	additionalRequired = [],
	additionalProperties = false,
	conditional
}) {
	const rootSchema = Array.isArray(root)
		? { enum: root }
		: { const: root };

	const schema = {
		type: 'object',
		properties: {
			...baseProperties,
			...properties,
			root: rootSchema
		},
		additionalProperties
	};

	if(conditional) {
		schema.if = conditional.if;
		schema.then = { required: [...baseRequired, ...additionalRequired, ...(conditional.thenRequired || [])] };
		schema.else = { required: [...baseRequired, ...additionalRequired, ...(conditional.elseRequired || [])] };
	} else
		schema.required = [...baseRequired, ...additionalRequired];

	return schema;
}

module.exports = {
	defineViewSchema
};
