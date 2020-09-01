'use strict';

const { makeComponent } = require('../../../../utils');
const { dateTimePicker } = require('../componentNames');

const booleanType = { type: 'boolean' };

module.exports = makeComponent({
	name: dateTimePicker,
	properties: {
		setStartOfDay: booleanType,
		setEndOfDay: booleanType,
		selectRange: booleanType,
		selectDate: booleanType,
		selectTime: booleanType,
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
