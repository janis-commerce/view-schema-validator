'use strict';

const { makeComponent } = require('../../../utils');
const { icon } = require('../componentNames');

module.exports = makeComponent({
	name: icon,
	properties: {
		icon: { type: 'string' },
		color: { type: 'string' }
	}
});
