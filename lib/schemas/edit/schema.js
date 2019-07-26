'use strict';

const newEditSchema = require('../edit-new/schema');

module.exports = {
	...newEditSchema,
	properties: {
		...newEditSchema.properties,
		root: { type: 'string', enum: ['Edit'] }
	}
};
