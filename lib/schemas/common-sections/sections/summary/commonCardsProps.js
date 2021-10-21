'use strict';

module.exports = {
	properties: {
		x: { type: 'number' },
		y: { type: 'number' },
		width: { type: 'number' },
		height: {
			oneOf: [
				{ type: 'number' },
				{ const: 'auto' }
			]
		},
		name: { type: 'string' },
		title: { type: 'string' },
		hideTitle: { type: 'boolean' }
	},
	requiredProperties: ['name', 'x', 'y', 'width', 'height']
};
