'use strict';

const { makeComponent } = require('../../../utils');
const { fieldList } = require('../componentNames');
const field = require('../field');

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
			items: field,
			minItems: 1
		}
	},
	requiredProperties: ['direction']
});
