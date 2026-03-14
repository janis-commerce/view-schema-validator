'use strict';

const { makeComponent } = require('../../../utils');
const { text } = require('../componentNames');

module.exports = makeComponent({
	name: text,
	properties: {
		fontWeight: {
			type: 'string',
			enum: ['light', 'normal', 'medium', 'bold']
		},
		icon: { type: 'string' },
		iconColor: { type: 'string' }
	}
});
