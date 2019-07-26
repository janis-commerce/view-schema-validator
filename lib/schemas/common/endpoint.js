'use strict';

module.exports = {
	type: 'object',
	properties: {
		service: { type: 'string' },
		namespace: { type: 'string' },
		method: { type: 'string' },
		resolve: { type: 'boolean', default: true }
	},
	required: ['service', 'namespace', 'method']
};
