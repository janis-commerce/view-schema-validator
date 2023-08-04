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
		maxValueField: { type: 'string' }
	},
	conditions: {
		allOf: [
			{
				if: {
					not: {
						properties: {
							type: { const: 'number' }
						}
					}
				},
				then: {
					not: {
						properties: {
							minValue: { type: 'number' }
						},
						required: ['minValue']
					}
				}
			},
			{
				if: {
					not: {
						properties: {
							type: { const: 'number' }
						}
					}
				},
				then: {
					not: {
						properties: {
							maxValue: { type: 'number' }
						},
						required: ['maxValue']
					}
				}
			},
			{
				if: {
					not: {
						properties: {
							type: { const: 'number' }
						}
					}
				},
				then: {
					not: {
						properties: {
							minValueField: { type: 'string' }
						},
						required: ['minValueField']
					}
				}
			},
			{
				if: {
					not: {
						properties: {
							type: { const: 'number' }
						}
					}
				},
				then: {
					not: {
						properties: {
							maxValueField: { type: 'string' }
						},
						required: ['maxValueField']
					}
				}
			},
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
