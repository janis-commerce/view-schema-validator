'use strict';

const MAPPERS = ['addHashtag', 'booleanToStatus', 'booleanToWord', 'translate'];

const baseMapperSchema = [
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
				name: { const: 'date' }
			}
		},
		then: {
			properties: {
				name: { const: 'date' },
				props: {
					type: 'object',
					properties: {
						format: {
							type: 'string'
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
				name: { const: 'prefix' }
			}
		},
		then: {
			properties: {
				name: { const: 'prefix' },
				props: {
					type: 'object',
					properties: {
						translate: { type: 'boolean' },
						value: { type: 'string' }
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
				name: { const: 'suffix' }
			}
		},
		then: {
			properties: {
				name: { const: 'suffix' },
				props: {
					type: 'object',
					properties: {
						translate: { type: 'boolean' },
						value: { type: 'string' }
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
];

const mapperSchema = {
	allOf: [
		...baseMapperSchema,
		{
			if: {
				type: 'array'
			},
			then: {
				type: 'array',
				items: {
					allOf: baseMapperSchema
				}
			}
		}
	]
};


module.exports = mapperSchema;
