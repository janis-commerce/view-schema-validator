'use strict';

module.exports = {
	properties: {
		path: { type: 'string' },
		endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
	}
};
