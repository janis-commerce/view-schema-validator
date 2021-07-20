'use strict';

module.exports = {
	properties: {
		x: { type: 'number' },
		y: { type: 'number' },
		width: { type: 'number' },
		height: { type: 'number' },
		name: { type: 'string' },
		title: { type: 'string' },
		hideTitle: { type: 'boolean' }
	},
	requiredProperties: ['name', 'x', 'y', 'width', 'height']
};
