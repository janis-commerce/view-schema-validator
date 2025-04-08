'use strict';

const { makeComponent } = require('../utils');
const { link } = require('./componentNames');
const mapper = require('../common/mapper');
const linkProps = require('../common/linkProps');

module.exports = makeComponent({
	name: link,
	properties: {
		translateLabels: { type: 'boolean' },
		icon: { type: 'string' },
		label: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		labelField: { type: 'string' },
		labelMapper: mapper,
		target: { type: 'string' },
		urlTarget: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		openPrint: { type: 'boolean' },
		...linkProps.properties
	}
});
