'use strict';

const { makeComponent } = require('../../../utils');
const { map } = require('../componentNames');

module.exports = makeComponent({
	name: map,
	properties: {
		showSearchBar: { type: 'boolean' },
		canAddMarkers: { type: 'boolean' },
		maxMarkersQuantity: { type: 'number' },
		fieldsMapping: {
			type: 'object',
			additionalProperties: { type: 'string' }
		}
	},
	requiredProperties: ['fieldsMapping']
});
