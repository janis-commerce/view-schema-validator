'use strict';

const { makeComponent } = require('../utils');

const dateTypeEnum = { type: 'string', enum: ['relative', 'deliveryDate'] };
const componentEnum = { type: 'string', enum: ['Chip', 'Text', 'MediumChip', 'TimeChip'] };
const optionalString = { type: 'string' };

module.exports = makeComponent({
	name: 'Date',
	properties: {
		component: componentEnum,
		type: dateTypeEnum,
		format: optionalString,
		incomingFormat: optionalString,
		start: optionalString,
		end: optionalString
	}
});
