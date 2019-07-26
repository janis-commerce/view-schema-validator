'use strict';

// const Action = require('./action');
// const Field = require('./field');
const texts = require('./components/texts');
const chips = require('./components/chips');

const components = [
	...texts,
	...chips
	/*
	{
		name: chip,
		attributesStruct: {},
		children: [{
			name: timeChip
		}]
	},
	{
		name: statusChip,
		attributesStruct: {
			colorSource: 'string'
		}
	},
	{
		name: smallChip,
		attributesStruct: {
			translateLabels: struct.optional('boolean', false),
			borderColor: struct.optional('string', 'blue'),
			background: struct.optional('string', 'white'),
			color: struct.optional('string', 'blue')
		}
	},
	{
		name: actionButtons,
		attributesStruct: {
			actionsData: struct.intersection([
				'!empty',
				struct.list([Action])
			])
		}
	},
	{
		name: icon,
		attributesStruct: {
			icon: struct.optional('string'),
			color: struct.optional('string')
		}
	},
	{
		name: fieldList,
		attributesStruct: {
			direction: struct.enum(['horizontal', 'vertical'], 'vertical'),
			fields: struct.intersection(['!empty', struct.list([Field])])
		}
	},
	{
		name: image,
		attributesStruct: {
			roundBorders: struct('boolean', false),
			width: struct.union(['number', struct.literal('auto')], 'auto'),
			height: struct.union(['number', struct.literal('auto')], 'auto')
		}
	},
	{
		name: userImage,
		attributesStruct: {
			roundBorders: struct.literal(true, true),
			size: struct.enum(['small', 'medium', 'large'])
		}
	},
	{
		name: badgeLetter,
		attributesStruct: {
			translateLabels: struct.optional('boolean', true)
		}
	} */
];


module.exports = components;
