'use strict';

const endpoint = require('../../common/endpoint');

const endpointParameters = {
	type: 'object',
	propertyNames: { type: 'string' },
	additionalProperties: { type: 'string' }
};

module.exports = {
	type: 'object',
	properties: {
		title: { type: 'string' },
		name: { type: 'string' },
		color: { type: 'string' },
		icon: { type: 'string' },
		type: { type: 'string' },
		options: {
			oneOf: [
				{
					type: 'object',
					properties: {
						endpoint,
						endpointParameters
					}
				},
				{
					type: 'object',
					properties: {
						path: { type: 'string' },
						endpointParameters
					}
				}
			]
		}
	},
	required: ['name', 'type']
};
