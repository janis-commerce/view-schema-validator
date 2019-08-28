'use strict';

const componentNames = require('../componentNames');
const { makeComponent } = require('../../../utils');

const { chip } = componentNames;

module.exports = makeComponent({
	name: chip,
	properties: {
		icon: { type: 'string' },
		iconColor: { type: 'string' },
		borderColor: { type: 'string', default: 'grey' }
	}
});
