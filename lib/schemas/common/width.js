'use strict';

module.exports = {
	oneOf: [
		{ type: 'number' },
		{
			type: 'string',
			pattern: '^auto$|^([0-9]|[1-8][0-9]|9[0-9]|100)%$|^[0-9]+px$'
		}
	]
};
