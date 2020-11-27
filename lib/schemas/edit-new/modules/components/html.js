'use strict';

const { makeComponent } = require('../../../utils');
const { html } = require('../componentNames');

module.exports = makeComponent({
	name: html,
	properties: {
		sourceField: { type: 'string' },
		width: { type: 'number' },
		height: {
			anyOf: [
				{ type: 'string', enum: ['medium', 'large', 'full'] },
				{ type: 'number' }
			]
		}
	}
});
