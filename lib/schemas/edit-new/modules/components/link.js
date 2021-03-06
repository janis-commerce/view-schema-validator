'use strict';

const { makeComponent } = require('../../../utils');
const { link } = require('../componentNames');

module.exports = makeComponent({
	name: link,
	properties: {
		translateLabels: { type: 'boolean' },
		label: { type: 'string' },
		labelField: { type: 'string' },
		target: { type: 'string' },
		path: { type: 'string' },
		urlTarget: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		endpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
	}
});
