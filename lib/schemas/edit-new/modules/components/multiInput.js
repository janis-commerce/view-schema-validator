'use strict';

const { makeComponent } = require('../../../utils');
const componentsNames = require('../componentNames');

module.exports = makeComponent({
	name: componentsNames.multiInput,
	properties: {
		labelsPrefix: { type: 'string', default: '' },
		translateLabels: { type: 'boolean', default: true }
	}
});
