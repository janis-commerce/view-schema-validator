'use strict';

const componentNames = require('../componentNames');
const { makeComponent } = require('../../../utils');

const { image, userImage } = componentNames;

const imageComponents = [
	{
		name: image,
		properties: {
			roundBorders: {
				oneOf: [
					{ type: 'boolean' },
					{ type: 'number' }
				],
				default: false
			},
			width: {
				oneOf: [
					{ type: 'number' },
					{ const: 'auto'	}
				],
				default: 'auto'
			},
			height: {
				oneOf: [
					{ type: 'number' },
					{ const: 'auto'	}
				],
				default: 'auto'
			}
		}
	},
	{
		name: userImage,
		properties: {
			roundBorders: { const: true, default: true },
			size: {
				enum: ['small', 'medium', 'large']
			}
		}
	}
];


module.exports = imageComponents.map(makeComponent);
