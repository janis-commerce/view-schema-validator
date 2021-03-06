'use strict';

const { makeComponent } = require('../../../../utils');
const { input } = require('../componentNames');

module.exports = makeComponent({
	name: input,
	properties: {
		icon: { type: 'string' }
	}
});
