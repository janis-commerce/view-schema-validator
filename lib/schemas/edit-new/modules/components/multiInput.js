'use strict';

const { makeComponent } = require('../../../utils');
const { multiInput } = require('../componentNames');

module.exports = makeComponent({
	name: multiInput,
	properties: {
		labelsPrefix: { type: 'string', default: '' },
		translateLabels: { type: 'boolean', default: true }
	}
});
