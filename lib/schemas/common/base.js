'use strict';

module.exports = {
	properties: {
		root: { type: 'string' },
		service: { type: 'string' },
		name: { type: 'string' },
		title: { type: 'string' },
		source: {
			$ref: 'schemaDefinitions#/definitions/endpoint'
		}
	},
	required: ['root', 'name', 'service', 'source']
};
