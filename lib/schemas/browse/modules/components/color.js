'use strict';

const { makeComponent } = require('../../../utils');
const { color } = require('../componentNames');

module.exports = makeComponent({
	name: color,
	properties: {
		showCode: { type: 'boolean' }
	}
});
