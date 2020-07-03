'use strict';

const { makeComponent } = require('../../../../utils');
const { dateTimePicker } = require('../componentNames');

module.exports = makeComponent({
	name: dateTimePicker,
	properties: {
		setStartOfDay: { type: 'boolean' },
		setEndOfDay: { type: 'boolean' },
		selectRange: { type: 'boolean' },
		selectDate: { type: 'boolean' },
		selectTime: { type: 'boolean' }
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
