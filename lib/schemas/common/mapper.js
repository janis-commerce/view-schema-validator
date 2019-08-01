'use strict';

const MAPPERS = ['addHashtag', 'booleanToStatus', 'booleanToWord', 'translate'];

const Mapper = {
	allOf: [
		{
			if: { type: 'string' },
			then: { type: 'string' }
		},
		{
			if: {
				type: 'object',
				properties: {
					name: { const: 'numberToTime' }
				}
			},
			then: {
				properties: {
					name: { const: 'numberToTime' },
					props: {
						type: 'object',
						properties: {
							type: {
								type: 'string',
								enum: ['minute', 'hour', 'day', 'week'],
								default: 'hour'
							}
						},
						additionalProperties: false
					}
				}
			}
		},
		{
			if: {
				type: 'object',
				properties: {
					name: { enum: MAPPERS }
				}
			},
			then: {
				type: 'object',
				properties: {
					name: { enum: MAPPERS }
				},
				additionalProperties: false
			}
		}
	]
};


module.exports = Mapper;
