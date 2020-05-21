'use strict';

const { makeComponent } = require('../../../../utils');
const { userSelector } = require('../componentNames');

module.exports = makeComponent({
	name: userSelector,
	properties: {
		isMulti: { type: 'boolean' }
	}
});
