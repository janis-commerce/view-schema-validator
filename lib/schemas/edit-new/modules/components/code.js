'use strict';

const { makeComponent } = require('../../../utils');
const { code } = require('../componentNames');

module.exports = makeComponent({
	name: code,
	properties: {
		language: { type: 'string' },
		canEdit: { type: 'boolean' },
		width: { type: 'number' },
		height: {
			anyOf: [
				{ type: 'string', enum: ['medium', 'large', 'full'] },
				{ type: 'number' }
			]
		}
	}
});
