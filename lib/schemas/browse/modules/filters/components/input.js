'use strict';

const { input } = require('../componentNames');

module.exports = {
	if: {
		properties: {
			component: { const: input }
		}
	},
	then: { type: 'object' }
};
