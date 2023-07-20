'use strict';

const { conditionsSchema } = require('../../../common/conditions/conditions');
const { makeComponent } = require('../../../utils');
const { countDown } = require('../componentNames');

const themeConditionals = {
	type: 'object',
	additionalProperties: conditionsSchema,
	minProperties: 1
};

module.exports = makeComponent({
	name: countDown,
	properties: {
		useTheme: { type: ['boolean', 'string'] },
		dateStart: { type: 'string' },
		dateEnd: { type: 'string' },
		icon: { type: 'string' },
		themeConditionals
	}
});
