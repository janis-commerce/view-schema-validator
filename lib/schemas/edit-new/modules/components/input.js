'use strict';

const { makeComponent } = require('../../../utils');
const { input } = require('../componentNames');

module.exports = makeComponent({
	name: input,
	properties: {
		icon: { type: 'string' },
		type: { enum: ['text', 'number', 'email', 'password', 'hidden'] },
		autoComplete: { type: 'boolean' }
	}
});
