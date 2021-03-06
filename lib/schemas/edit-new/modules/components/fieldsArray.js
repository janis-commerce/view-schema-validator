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
		maxElements: { type: 'number' },
		addButtonText: { type: 'string' },
		addButtonTextColor: { type: 'string' },
		addButtonBackgroundColor: { type: 'string' },
		addButtonIcon: { type: 'string' }
	},
	requiredProperties: ['fields']
});
