'use strict';

const componentNames = require('../componentNames');
const { makeComponent } = require('../../../utils');

const {
	chip,
	timeChip,
	statusChip,
	smallChip,
	userChip
} = componentNames;

const chipComponents = [
	{
		name: timeChip
	},
	{
		name: userChip,
		properties: {
			userDataSource: {
				type: 'object',
				properties: {
					firstname: { type: 'string' },
					lastname: { type: 'string' },
					email: { type: 'string' },
					images: { type: 'string' }
				},
				additionalProperties: false,
				required: ['firstname', 'lastname', 'email']
			}
		}
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
			useTheme: { type: 'boolean' },
			colorSource: { type: 'string' }
		},
		conditions: {
			if: {
				properties: {
					useTheme: { const: false }
				}
			},
			then: {
				required: ['colorSource']
			}
		}
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
