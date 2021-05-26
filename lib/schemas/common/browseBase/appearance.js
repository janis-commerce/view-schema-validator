'use strict';

const appearanceProps = {
	type: 'object',
	properties: {
		rowMinHeight: { type: 'number' },
		rowVerticalAlign: { enum: ['top', 'middle', 'bottom'] }
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
