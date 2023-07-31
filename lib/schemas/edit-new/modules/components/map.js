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

const fieldsMappingProperties = keys.reduce((accum, key) => ({
	...accum,
	[key]: { type: 'string' }
}), {});

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
		size: { type: 'number' },
		hideDefaultMarkers: { type: 'boolean' },
		useTheme: { type: ['boolean', 'string'] },
		themeConditionals,
		themeField: { type: 'string' },
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

module.exports.mapSchema = makeComponent({
	name: map,
	properties: {
		showSearchBar: { type: 'boolean' },
		canAddMarkers: { type: 'boolean' },
		canDragMarkers: { type: 'boolean' },
		showPOI: { type: 'boolean' },
		drawRoute: { type: 'boolean' },
		maxMarkersQuantity: { type: 'number' },
		markers: markersSchema,
		fieldsMapping: {
			type: 'object',
			properties: fieldsMappingProperties,
			additionalProperties: false
		}
	}
});

module.exports.markersSchema = markersSchema;
