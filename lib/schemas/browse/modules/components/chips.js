'use strict';

const componentNames = require('../componentNames');
const { makeComponent } = require('../../../utils');

const { chip, timeChip, statusChip } = componentNames;

const chipComponents = [
	{
		name: [chip, timeChip]
	},
	{
		name: statusChip,
		properties: {
			colorSource: { type: 'string' }
		},
		requiredProperties: ['colorSource']
	}
];


module.exports = chipComponents.map(makeComponent);
