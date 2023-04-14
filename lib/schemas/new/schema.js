'use strict';

const newEditSchema = require('../edit-new/schema');

module.exports = {
	...newEditSchema,
	else: [...newEditSchema.else.required, 'target']
};
