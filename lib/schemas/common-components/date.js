'use strict';

const { makeComponent } = require('../utils');

const dateTypeEnum = { type: 'string', enum: ['relative', 'deliveryDate'] };
const componentEnum = { type: 'string', enum: ['Chip', 'Text', 'Mediumchip', 'Timechip'] };

module.exports = makeComponent({
	name: 'Date',
	properties: {
		type: dateTypeEnum,
		component: componentEnum
	}
});
