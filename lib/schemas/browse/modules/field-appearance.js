
'use strict';

const appearanceProps = {
	type: 'object',
	properties: {
		fontColor: { type: 'string' },
		fontSize: {
			enum: [
				'base',
				'baseSmall',
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
				{ const: 'auto' },
				{ type: 'number' }
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
