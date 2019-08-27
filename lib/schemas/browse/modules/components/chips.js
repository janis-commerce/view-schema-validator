'use strict';

const componentNames = require('../componentNames');
const { makeComponent } = require('../../../utils');

const { chip, timeChip, statusChip, smallChip } = componentNames;

const chipComponents = [
	{
		name: timeChip
	},
	{
		name: chip,
		properties: {
			icon: { type: 'string' },
			iconColor: { type: 'string' },
			borderColor: { type: 'string', default: 'grey' }
		}
	},
	{
		name: statusChip,
		properties: {
			colorSource: { type: 'string' }
		},
		requiredProperties: ['colorSource']
	},
	{
		name: smallChip,
		properties: {
			translateLabels: { type: 'boolean', default: false },
			borderColor: { type: 'string', default: 'blue' },
			background: { type: 'string', default: 'white' },
			color: { type: 'string', default: 'blue' }
		}
	}
];


module.exports = chipComponents.map(makeComponent);
