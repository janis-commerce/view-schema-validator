'use strict';

const { makeComponent } = require('../../../utils');
const { conditionsSchema } = require('../../../common/conditions/conditions');
const fieldsGroup = require('../../../common-sections/sections/components/fieldGroup');
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

const themeConditionals = {
	type: 'object',
	additionalProperties: conditionsSchema,
	minProperties: 1
};

const markersSchema = {
	type: 'object',
	properties: {
		icon: { type: 'string' },
		color: { type: 'string' },
		useTheme: { type: ['boolean', 'string'] },
		themeConditionals,
		infoSchema: {
			type: 'object',
			properties: {
				fieldsGroup
			},
			minProperties: 1,
			additionalProperties: false
		}
	},
	additionalProperties: false,
	minProperties: 1
};

module.exports = makeComponent({
	name: map,
	properties: {
		showSearchBar: { type: 'boolean' },
		canAddMarkers: { type: 'boolean' },
		maxMarkersQuantity: { type: 'number' },
		markers: markersSchema,
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

module.exports.markersSchema = markersSchema;
