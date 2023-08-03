'use strict';

const { makeComponent } = require('../../../utils');
const { input } = require('../componentNames');

module.exports = makeComponent({
	name: input,
	properties: {
		icon: { type: 'string' },
		type: { enum: ['text', 'number', 'email', 'password', 'hidden'] },
		autoComplete: { type: 'boolean' },
		minValue: { type: 'number' },
		minValueField: { type: 'string' },
		maxValue: { type: 'number' },
		maxValueField: { type: 'string' } // entender bien esto y usar if para excluir
	},
	conditions: {
		allOf: [
			{
				if: {
					properties: { minValue: { const: false } }
				},
				then: {
					not: {
						properties: { minValue: { type: 'number' } },
						required: ['minValue']
					}
				},
				else: {
					not: {
						properties: { minValueField: { type: 'string' } },
						required: ['minValueField']
					}
				}
			},
			{
				if: {
					properties: { maxValue: { const: false } }
				},
				then: {
					not: {
						properties: { maxValue: { type: 'number' } },
						required: ['maxValue']
					}
				},
				else: {
					not: {
						properties: { maxValueField: { type: 'string' } },
						required: ['maxValueField']
					}
				}
			}
		]
	}
});
