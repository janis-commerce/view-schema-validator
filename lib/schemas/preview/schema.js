'use strict';

const { properties, required } = require('../common/base');
const themes = require('../common/themes');
const sectionNames = require('./sectionsNames');
const makeSections = require('../common-sections');
const header = require('../edit-new/modules/headerProperties');
const makeGenericActions = require('../common/generic-actions');

const customCallbacks = ['removeRow', 'reloadRow', 'reloadBrowse'];

module.exports = {
	type: 'object',
	properties: {
		...properties,
		header,
		themes,
		actions: makeGenericActions({ customCallbacks }),
		root: { const: 'Preview' },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		sourceEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
		sections: makeSections(sectionNames)
	},
	additionalProperties: false,
	required: [...required, 'sections']
};
