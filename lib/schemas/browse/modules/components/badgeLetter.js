'use strict';

const { makeComponent } = require('../../../utils');
const { badgeLetter } = require('../componentNames');

module.exports = makeComponent({
	name: badgeLetter,
	properties: {
		translateLabels: { type: 'boolean', default: true }
	}
});
