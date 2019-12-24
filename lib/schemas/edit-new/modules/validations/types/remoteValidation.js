'use strict';

module.exports = {
	if: {
		properties: {
			name: { const: 'request' }
		}
	},
	then: {
		properties: {
			name: { const: 'request' },
			options: {
				type: 'object',
				properties: {
					endpoint: {
						$ref: 'schemaDefinitions#/definitions/endpoint'
					},
					valueParam: { type: 'string', default: 'value' }
				},
				required: ['endpoint', 'valueParam'],
				additionalProperties: false
			}
		},
		required: ['name', 'options'],
		additionalProperties: false
	}
};
