'use strict';

const { makeComponent } = require('../../../../utils');
const { dateTimePicker } = require('../componentNames');

const booleanType = { type: 'boolean' };

module.exports = makeComponent({
	name: dateTimePicker,
	properties: {
		useTimezone: booleanType,
		setStartOfDay: booleanType,
		setEndOfDay: booleanType,
		selectRange: booleanType,
		selectDate: booleanType,
		selectTime: booleanType,
		canCreateTime: booleanType,
		format: { type: 'string' },
		presets: {
			oneOf: [
				booleanType,
				{
					type: 'object',
					properties: {
						today: booleanType,
						yesterday: booleanType,
						nextWeek: booleanType,
						lastWeek: booleanType,
						lastMonth: booleanType,
						nextMonth: booleanType
					},
					additionalProperties: false
				}
			]
		},
		timeOptions: {
			type: 'object',
			properties: {
				hourLapse: { type: 'number' },
				minuteLapse: { type: 'number' },
				custom: {
					type: 'array',
					items: {
						type: 'string',
						pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
					},
					minItems: 1
				}
			},
			minProperties: 1,
			additionalProperties: false
		}
	},
	conditions: {
		if: {
			properties: {
				selectDate: { const: false },
				selectTime: { const: false }
			}
		},
		then: {
			properties: {
				selectDate: { const: true },
				selectTime: { const: true }
			},
			required: ['selectDate', 'selectTime']
		}
	}
});
