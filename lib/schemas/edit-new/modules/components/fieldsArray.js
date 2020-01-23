'use strict';

const { makeComponent } = require('../../../utils');
const { fieldsArray } = require('../componentNames');

module.exports = makeComponent({
	name: fieldsArray,
	properties: {
		fields: {
			type: 'array',
			items: {
				$ref: 'schemaDefinitions#/definitions/editNewField'
			},
			minItems: 1
		},
		uniqueField: { type: 'boolean' },
		canChangeElements: { type: 'boolean' },
		minElements: { type: 'number' },
		maxElements: { type: 'number' }
	},
	requiredProperties: ['fields']
});
