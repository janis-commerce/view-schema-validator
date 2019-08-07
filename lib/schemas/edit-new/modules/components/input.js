'use strict';

const { makeComponent } = require('../../../utils');
const componentsNames = require('../componentNames');

module.exports = makeComponent({
	name: componentsNames.input,
	properties: {
		type: { enum: ['text', 'number', 'email'] }
	}
});
