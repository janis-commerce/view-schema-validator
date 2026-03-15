'use strict';

module.exports = {
	type: 'object',
	properties: {
		size: { type: 'string', enum: ['small', 'medium', 'big'] },
		theme: { type: 'string', enum: ['dark', 'light'] },
		placeholder: { type: 'string' },
		help: { type: 'string' }
	}
};
