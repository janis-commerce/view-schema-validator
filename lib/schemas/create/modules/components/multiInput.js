'use strict';

const { makeComponent } = require('../../../utils');
const { multiInput } = require('../componentNames');


const commonProps = {
	icon: { type: 'string' },
	type: { enum: ['text', 'number', 'email', 'password', 'hidden'] },
	autoComplete: { type: 'boolean' }
};

module.exports = makeComponent({
	name: multiInput,
	properties: {
		...commonProps,
		labelsPrefix: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		labelPrefix: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		translateLabels: { type: 'boolean', default: true },
		requiredFields: {
			type: 'array',
			items: {
				oneOf: [
					{ type: 'string' },
					{
						type: 'object',
						properties: {
							name: { type: 'string' },
							componentAttributes: {
								type: 'object',
								properties: commonProps,
								additionalProperties: false,
								minProperties: 1
							}
						},
						additionalProperties: false,
						required: ['componentAttributes', 'name']
					}
				]
			},
			minItems: 1
		}
	}
});
