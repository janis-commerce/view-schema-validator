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
		canChangeElements: { type: 'boolean' },
		minElements: { type: 'number' }
	},
	requiredProperties: ['fields']
});
