'use strict';

const { makeComponent } = require('../../../utils');
const { multiInput } = require('../componentNames');

module.exports = makeComponent({
	name: multiInput,
	properties: {
		labelsPrefix: { type: 'string', default: '' },
		labelPrefix: { type: 'string', default: '' },
		translateLabels: { type: 'boolean', default: true },
		requiredFields: {
			type: 'array',
			items: { type: 'string' },
			minItems: 1
		}
	}
});
