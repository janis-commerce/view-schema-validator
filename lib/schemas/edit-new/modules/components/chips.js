'use strict';

const componentNames = require('../componentNames');
const { makeComponent } = require('../../../utils');

const { chip, userChip } = componentNames;

const chipComponents = [
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
				required: ['firstname', 'lastname', 'email', 'images']
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
	}
];

module.exports = chipComponents.map(makeComponent);
