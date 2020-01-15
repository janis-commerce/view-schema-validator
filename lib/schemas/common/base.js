'use strict';

module.exports = {
	properties: {
		root: { type: 'string' },
		service: { type: 'string' },
		name: { type: 'string' },
		title: { type: 'string' }
	},
	required: ['root', 'name', 'service']
};
