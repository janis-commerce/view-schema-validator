'use strict';

const { makeComponent } = require('../../../utils');
const { multiValueWrapper } = require('../componentNames');

module.exports = makeComponent({
	name: multiValueWrapper,
	properties: {
		direction: {
			type: 'string',
			enum: ['horizontal', 'vertical'],
			default: 'vertical'
		},
		field: {
			$ref: 'schemaDefinitions#/definitions/browseField'
		}
	},
	requiredProperties: ['direction', 'field']
});
