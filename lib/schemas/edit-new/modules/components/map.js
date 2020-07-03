'use strict';

const { makeComponent } = require('../../../utils');
const { map } = require('../componentNames');

const keys = [
	'street',
	'number',
	'neighborhood',
	'city',
	'state',
	'postalCode',
	'country',
	'latitude',
	'longitude',
	'formattedAddress'
];

module.exports = makeComponent({
	name: map,
	properties: {
		showSearchBar: { type: 'boolean' },
		canAddMarkers: { type: 'boolean' },
		maxMarkersQuantity: { type: 'number' },
		fieldsMapping: {
			type: 'object',
			properties: keys.reduce((accum, key) => ({
				...accum,
				[key]: { type: 'string' }
			}), {}),
			additionalProperties: false
		}
	}
});
