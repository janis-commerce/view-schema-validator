'use strict';

const { makeComponent } = require('../../../utils');
const { code } = require('../componentNames');

module.exports = makeComponent({
	name: code,
	properties: {
		language: { type: 'string' }
	}
});