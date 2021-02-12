'use strict';

const getEndpointParametersValue = onlyStatic => {
	const dynamicProps = !onlyStatic ? { dynamic: { type: 'string' } } : {};

	return {
		...dynamicProps,
		static: {
			anyOf: [
				{ type: 'string' },
				{ type: 'number' },
				{ type: 'array' },
				{ type: 'object' }
			]
		}
	};
};

module.exports = onlyStatic => ({
	type: 'array',
	items: {
		type: 'object',
		properties: {
			name: { type: 'string' },
			target: { enum: ['path', 'query'] },
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
