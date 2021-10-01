'use strict';

const { properties, required } = require('../common/base');
const themes = require('../common/themes');
const sectionNames = require('./sectionsNames');
const makeSections = require('../common-sections');
const header = require('../edit-new/modules/headerProperties');
const actions = require('./actions');


module.exports = {
	type: 'object',
	properties: {
		...properties,
		header,
		themes,
		actions,
		root: { const: 'Preview' },
		source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
		sourceEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' },
		sections: makeSections(sectionNames)
	},
	additionalProperties: false,
	required: [...required, 'sections']
};
