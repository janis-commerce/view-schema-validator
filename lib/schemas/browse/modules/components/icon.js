'use strict';

const { makeComponent } = require('../../../utils');
const { conditionsSchema } = require('../../../common/conditions/conditions');
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
		color: themeProps,
		useTheme: { type: 'string' },
		themeConditionals: {
			type: 'object',
			additionalProperties: conditionsSchema,
			minProperties: 1
		}
	}
});
