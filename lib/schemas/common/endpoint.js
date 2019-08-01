'use strict';

module.exports = {
	type: 'object',
	properties: {
		service: { type: 'string' },
		namespace: { type: 'string' },
		method: { type: 'string' },
		resolve: { type: 'boolean', default: true }
	},
	additionalProperties: false,
	required: ['service', 'namespace', 'method']
};
