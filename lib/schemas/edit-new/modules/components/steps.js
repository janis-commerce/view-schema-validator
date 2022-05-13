'use strict';

const { makeComponent } = require('../../../utils');
const { steps } = require('../componentNames');

module.exports = makeComponent({
	name: steps,
	properties: {
		icon: { type: 'string' },
		stepKey: { type: 'string' },
		tooltip: { type: 'string' },
		maxNextSteps: { type: 'number' },
		label: { $ref: 'schemaDefinitions#/definitions/stringPrefix' }
	}
});
