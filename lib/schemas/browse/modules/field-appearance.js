
'use strict';

const appearanceProps = {
	type: 'object',
	properties: {
		fontColor: { type: 'string' },
		fontSize: {
			enum: [
				'base',
				'baseSmall',
				'medium',
				'small',
				'xsmall',
				'large',
				'xlarge',
				'xxlarge'
			]
		},
		align: { enum: ['left', 'center', 'right'] },
		verticalAlign: { enum: ['top', 'center', 'bottom'] },
		width: {
			oneOf: [
				{ type: 'number' },
				{
					type: 'string',
					pattern: '^auto$|^([0-9]|[1-8][0-9]|9[0-9]|100)%$|^[0-9]+px$'
				}
			]
		}
	},
	additionalProperties: false,
	minProperties: 1
};

module.exports = {
	type: 'object',
	properties: {
		default: appearanceProps,
		desktop: appearanceProps,
		mobile: appearanceProps
	},
	additionalProperties: false,
	minProperties: 1
};
