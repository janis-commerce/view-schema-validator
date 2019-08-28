'use strict';

const assert = require('assert');
const { makeComponent, makeSection } = require('../lib/schemas/utils');


describe('test schema utils functons', () => {
	it('should return object expected, without properties ', () => {
		const obj = {
			name: 'StatusChip'
		};

		const expectedObj = {
			if: {
				properties: {
					component: { const: 'StatusChip' }
				}
			},
			then: {
				properties: {
					componentAttributes: {
						type: 'object',
						properties: {},
						default: {},
						additionalProperties: false
					}
				}
			}
		};

		assert.deepEqual(expectedObj, makeComponent(obj));
	});

	it('should return object expected, without required property ', () => {
		const obj = {
			name: 'StatusChip',
			properties: {
				colorSource: { type: 'string' }
			}
		};

		const expectedObj = {
			if: {
				properties: {
					component: { const: 'StatusChip' }
				}
			},
			then: {
				properties: {
					componentAttributes: {
						type: 'object',
						properties: {
							colorSource: { type: 'string' }
						},
						default: {},
						additionalProperties: false
					}
				}
			}
		};

		assert.deepEqual(expectedObj, makeComponent(obj));
	});

	it('should return object expected, with required property', () => {
		const obj = {
			name: 'StatusChip',
			properties: {
				colorSource: { type: 'string' }
			},
			requiredProperties: ['colorSource']
		};

		const expectedObj = {
			if: {
				properties: {
					component: { const: 'StatusChip' }
				}
			},
			then: {
				properties: {
					componentAttributes: {
						type: 'object',
						properties: {
							colorSource: { type: 'string' }
						},
						required: ['colorSource'],
						default: {},
						additionalProperties: false
					}
				}
			}
		};

		assert.deepEqual(expectedObj, makeComponent(obj));
	});

	it('should return object expected with enum names', () => {
		const obj = {
			name: ['StatusChip', 'Chip'],
			properties: {
				colorSource: { type: 'string' }
			},
			requiredProperties: ['colorSource']
		};

		const expectedObj = {
			if: {
				properties: {
					component: { enum: ['StatusChip', 'Chip'] }
				}
			},
			then: {
				properties: {
					componentAttributes: {
						type: 'object',
						properties: {
							colorSource: { type: 'string' }
						},
						required: ['colorSource'],
						default: {},
						additionalProperties: false
					}
				}
			}
		};

		assert.deepEqual(expectedObj, makeComponent(obj));
	});

	it('should return object expected with conditions', () => {
		const obj = {
			name: 'StatusChip',
			properties: {
				colorSource: { type: 'string' }
			},
			conditions: {
				if: {
					properties: {
						name: {
							const: 'StatusChip'
						}
					}
				},
				then: {
					required: ['colorSource']
				}
			}
		};

		const expectedObj = {
			if: {
				properties: {
					component: { const: 'StatusChip' }
				}
			},
			then: {
				properties: {
					componentAttributes: {
						type: 'object',
						properties: {
							colorSource: { type: 'string' }
						},
						if: {
							properties: {
								name: {
									const: 'StatusChip'
								}
							}
						},
						then: {
							required: ['colorSource']
						},
						default: {},
						additionalProperties: false
					}
				}
			}
		};

		assert.deepEqual(expectedObj, makeComponent(obj));
	});

	it('should return object with without changes', () => {
		const obj = {
			if: {
				properties: {
					rootComponent: { const: 'MainForm' }
				}
			},
			then: {
				properties: {
					title: { type: 'string' },
					name: { type: 'string', const: 'mainFormSection' },
					rootComponent: { type: 'string', const: 'MainForm' }
				},
				required: ['name', 'rootComponent', 'fieldsGroup'],
				additionalProperties: false
			}
		};

		assert.deepEqual(obj, makeSection(obj));
	});

	it('should return object expected with custom properties', () => {
		const obj = {
			if: {
				properties: {
					rootComponent: { const: 'MainForm' }
				}
			},
			then: {
				properties: {
					title: { type: 'string' },
					name: { type: 'string', const: 'mainFormSection' },
					rootComponent: { type: 'string', const: 'MainForm' }
				},
				required: ['name', 'rootComponent', 'fieldsGroup'],
				additionalProperties: false
			}
		};

		const expectedObj = {
			if: {
				properties: {
					rootComponent: { const: 'MainForm' }
				}
			},
			then: {
				properties: {
					title: { type: 'string' },
					name: { type: 'string', const: 'mainFormSection' },
					rootComponent: { type: 'string', const: 'MainForm' },
					actions: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								name: { type: 'string' }
							}
						}
					}
				},
				required: ['name', 'rootComponent', 'fieldsGroup'],
				additionalProperties: false
			}
		};

		assert.deepEqual(expectedObj, makeSection(obj, {
			properties: {
				actions: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							name: { type: 'string' }
						}
					}
				}
			}
		}));
	});

	it('should return object expected with custom required properties', () => {
		const obj = {
			if: {
				properties: {
					rootComponent: { const: 'MainForm' }
				}
			},
			then: {
				properties: {
					title: { type: 'string' },
					name: { type: 'string', const: 'mainFormSection' },
					rootComponent: { type: 'string', const: 'MainForm' }
				},
				required: ['name', 'rootComponent', 'fieldsGroup'],
				additionalProperties: false
			}
		};

		const expectedObj = {
			if: {
				properties: {
					rootComponent: { const: 'MainForm' }
				}
			},
			then: {
				properties: {
					title: { type: 'string' },
					name: { type: 'string', const: 'mainFormSection' },
					rootComponent: { type: 'string', const: 'MainForm' },
					actions: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								name: { type: 'string' }
							}
						}
					},
					sarasa: { type: 'string' }
				},
				required: ['name', 'rootComponent', 'fieldsGroup', 'actions'],
				additionalProperties: false
			}
		};

		assert.deepEqual(expectedObj, makeSection(obj, {
			properties: {
				actions: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							name: { type: 'string' }
						}
					}
				},
				sarasa: { type: 'string' }
			},
			requiredProperties: ['actions']
		}));
	});
});
