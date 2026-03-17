'use strict';

const { makeComponent } = require('../../../utils');
const { preview } = require('../componentNames');

module.exports = makeComponent({
	name: preview,
	properties: {
		image: { type: 'string' },
		title: { type: 'string' },
		subtitle: { type: 'string' },
		description: { type: 'string' },
		price: { type: 'string' },
		listPrice: { type: 'string' }
	}
});
