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
					image: { type: 'string' }
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
			textColor: { type: 'string' },
			backgroundColor: { type: 'string' },
			borderColor: { type: 'string', default: 'grey' }
		}
	}
];

module.exports = chipComponents.map(makeComponent);
