'use strict';

const componentNames = require('./componentNames');
const components = require('./components');
const mapper = require('../../common/mapper');
const makeConditions = require('../../common/conditions');
const interactions = require('./interactions');
const filter = require('./filter');

const makeAppearance = () => {
	const appearanceProps = {
		type: 'object',
		properties: {
			fontColor: { type: 'string' },
			fontSize: {
				enum: [
					'base',
					'baseSmall',
					'small',
					'xsmall',
					'large',
					'xlarge',
					'xxlarge'
				]
			},
			align: { enum: ['left', 'center', 'right'] },
			verticalAlign: { enum: ['top', 'center', 'bottom'] }
		},
		additionalProperties: false,
		minProperties: 1
	};

	return {
		type: 'object',
		properties: {
			default: appearanceProps,
			desktop: appearanceProps,
			mobile: appearanceProps
		},
		additionalProperties: false,
		minProperties: 1
	};
};

module.exports = {
	type: 'object',
	properties: {
		component: { type: 'string', enum: Object.values(componentNames) },
		name: { type: 'string' },
		label: { type: 'string' },
		noLabel: { type: 'boolean' },
		deviceDisplay: { enum: ['desktop', 'mobile'] },
		appearance: makeAppearance(),
		attributes: {
			type: 'object',
			properties: {
				isStatus: { type: 'boolean', default: false },
				sortable: { type: 'boolean', default: false },
				isDefaultSort: { type: 'boolean', default: false },
				initialSortDirection: {
					type: 'string',
					enum: ['desc', 'asc'],
					default: 'desc'
				}
			},
			additionalProperties: false,
			default: {}
		},
		componentAttributes: {
			type: 'object',
			default: {}
		},
		mapper,
		filter,
		conditions: makeConditions(false),
		...interactions
	},
	allOf: components,
	additionalProperties: false,
	required: ['component', 'name', 'attributes']
};
