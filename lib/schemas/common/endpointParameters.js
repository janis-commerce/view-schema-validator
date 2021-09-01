'use strict';

const mapper = require('./mapper');

const getEndpointParametersValue = onlyStatic => {
	const dynamicProps = !onlyStatic ? { dynamic: { type: 'string' } } : {};

	return {
		...dynamicProps,
		static: {
			anyOf: [
				{ type: 'string' },
				{ type: 'number' },
				{ type: 'array' },
				{ type: 'boolean' },
				{ type: 'object' }
			]
		}
	};
};

const targetTypes = ['path', 'query', 'body', 'queryString', 'filter'];

module.exports = onlyStatic => ({
	type: 'array',
	items: {
		type: 'object',
		properties: {
			mapper,
			name: { type: 'string' },
			target: { enum: targetTypes },
			value: {
				type: 'object',
				properties: getEndpointParametersValue(onlyStatic),
				additionalProperties: false,
				minProperties: 1,
				maxProperties: 1
			}
		},
		additionalProperties: false,
		required: ['name', 'target', 'value']
	},
	minItems: 1
});
