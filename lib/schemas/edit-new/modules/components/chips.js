'use strict';

const componentNames = require('../componentNames');
const { makeComponent } = require('../../../utils');

const { chip, userChip, statusChip, mediumChip } = componentNames;

const themeProps = {
	oneOf: [
		{
			type: 'object',
			properties: {
				useTheme: { type: 'string' }
			},
			additionalProperties: false
		},
		{ type: 'string' }
	]
};

const chipComponents = [
	{
		name: userChip,
		properties: {
			source: { $ref: 'schemaDefinitions#/definitions/endpoint' },
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
		name: statusChip,
		properties: {
			useTheme: { type: ['boolean', 'string'] },
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
		name: [chip, mediumChip],
		properties: {
			icon: themeProps,
			iconColor: themeProps,
			textColor: { type: 'string' },
			backgroundColor: { type: 'string' },
			borderColor: { type: 'string', default: 'grey' }
		}
	}
];

module.exports = chipComponents.map(makeComponent);
