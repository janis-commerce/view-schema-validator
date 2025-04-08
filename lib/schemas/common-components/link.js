'use strict';

const { makeComponent } = require('../utils');
const { link: linkName } = require('./componentNames');
const mapper = require('../common/mapper');
const link = require('../common/link');

module.exports = makeComponent({
	name: linkName,
	properties: {
		translateLabels: { type: 'boolean' },
		icon: { type: 'string' },
		label: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		labelField: { type: 'string' },
		labelMapper: mapper,
		target: { type: 'string' },
		urlTarget: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		openPrint: { type: 'boolean' },
		...link.properties
	}
});
