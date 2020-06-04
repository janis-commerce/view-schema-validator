'use strict';

const { makeComponent } = require('../../../utils');
const { icon } = require('../componentNames');

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

module.exports = makeComponent({
	name: icon,
	properties: {
		icon: themeProps,
		color: themeProps
	},
	requiredProperties: ['icon']
});
