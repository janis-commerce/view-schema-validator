'use strict';

const componentNames = require('../componentNames');
const { makeComponent } = require('../../../utils');

const { chip, userChip } = componentNames;

const chipComponents = [
	{
		name: userChip
	},
	{
		name: chip,
		properties: {
			icon: { type: 'string' },
			iconColor: { type: 'string' },
			borderColor: { type: 'string', default: 'grey' }
		}
	}
];

module.exports = chipComponents.map(makeComponent);
