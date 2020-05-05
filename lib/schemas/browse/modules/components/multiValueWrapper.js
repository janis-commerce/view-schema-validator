'use strict';

const { makeComponent } = require('../../../utils');
const { multiValueWrapper } = require('../componentNames');

module.exports = makeComponent({
	name: multiValueWrapper,
	properties: {
		useDataField: { type: 'boolean' },
		direction: {
			type: 'string',
			enum: ['horizontal', 'vertical'],
			default: 'vertical'
		},
		field: { $ref: 'schemaDefinitions#/definitions/browseField' },
		isCollapsable: {
			oneOf: [
				{ type: 'boolean' },
				{ enum: ['onlyMobile', 'onlyDesktop'] }
			]
		},
		defaultStatus: { enum: ['open', 'closed'] },
		itemsToShowWhenClosed: { type: 'number' }
	},
	requiredProperties: ['direction', 'field']
});
