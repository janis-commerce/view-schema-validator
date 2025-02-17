'use strict';

const { properties, required } = require('../common/base');
const actions = require('../common/actions');
const remoteActions = require('../common/remoteActions');
const sectionNames = require('./modules/sectionNames');
const makeSections = require('../common-sections');

module.exports = {
	properties: {
		...properties,
		root: { enum: ['Settings'] },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		target: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		sections: makeSections(sectionNames),
		dependencies: { $ref: 'schemaDefinitions#/definitions/dependencies' },
		actions,
		remoteActions
	},
	required: [...required, 'sections']
};
