'use strict';

const { makeComponent } = require('../utils');
const { conditionsSchema } = require('../common/conditions/conditions');
const fieldsGroup = require('../common-sections/sections/components/fieldGroup');

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

module.exports = makeComponent({
	name: 'Location',
	properties: {
		label: {
			oneOf: [
				{ type: 'string' },
				{ $ref: 'schemaDefinitions#/definitions/template' }
			]
		},
		markers: markersSchema,
		modalSize: { $ref: 'schemaDefinitions#/definitions/modalSize' },
		fieldsMapping: {
			type: 'object',
			properties: fieldsMappingProperties,
			additionalProperties: false
		},
		verifiedAddressField: {
			type: 'string'
		}
	},
	requiredProperties: ['label']
});
