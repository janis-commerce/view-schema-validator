'use strict';

const endpoint = require('./endpoint');

module.exports = {
	properties: {
		root: { type: 'string' },
		service: { type: 'string' },
		name: { type: 'string' },
		title: { type: 'string' },
		source: endpoint
	},
	required: ['root', 'name', 'service', 'source']
};
