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
							oneOf: [
								{
									enum: ['minute', 'hour', 'day', 'week']
								},
								{
									pattern: '^([H]{1,2}|[m]{1,2}|[s]{1,2})(:([H]{1,2}|[m]{1,2}|[s]{1,2}))*$'
								}
							],
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
						incomingFormat: { type: 'string' },
						format: { type: 'string' },
						relative: { type: 'boolean' },
						start: { type: 'string' },
						end: { type: 'string' }
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
						addWhitespace: { type: 'boolean' },
						translate: { type: 'boolean' },
						value: { $ref: 'schemaDefinitions#/definitions/stringPrefix' }
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
						addWhitespace: { type: 'boolean' },
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
				name: { const: 'currency' }
			}
		},
		then: {
			properties: {
				name: { const: 'currency' },
				props: {
					type: 'object',
					properties: {
						currencyCode: { type: 'string' },
						currencyField: { type: 'string' }
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
				name: { const: 'arrayMap' }
			}
		},
		then: {
			properties: {
				name: { const: 'arrayMap' },
				props: {
					type: 'object',
					properties: {
						value: {
							oneOf: [
								{ type: 'string' },
								{ $ref: 'schemaDefinitions#/definitions/template' }
							]
						}
					},
					required: ['value'],
					additionalProperties: false
				}
			},
			required: ['props', 'name']
		}
	},
	{
		if: {
			type: 'object',
			properties: {
				name: { const: 'template' }
			}
		},
		then: {
			properties: {
				name: { const: 'template' },
				props: { $ref: 'schemaDefinitions#/definitions/template' }
			},
			required: ['props', 'name']
		}
	},
	{
		if: {
			type: 'object',
			properties: {
				name: { const: 'addStaticValue' }
			}
		},
		then: {
			properties: {
				name: { const: 'addStaticValue' },
				props: {
					type: 'object',
					properties: {
						value: { type: 'string' },
						translate: { type: 'boolean' }
					},
					required: ['value'],
					additionalProperties: false
				}
			},
			required: ['props', 'name']
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
