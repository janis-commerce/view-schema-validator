'use strict';

const { makeComponent } = require('../../../utils');
const { fieldList } = require('../componentNames');

module.exports = makeComponent({
	name: fieldList,
	properties: {
		direction: {
			type: 'string',
			enum: ['horizontal', 'vertical'],
			default: 'vertical'
		},
		fields: {
			type: 'array',
			items: {
				$ref: 'schemaDefinitions#/definitions/editNewField'
			},
			minItems: 1
		}
	},
	requiredProperties: ['direction', 'fields']
});
