'use strict';

const newEditSchema = require('../edit-new/schema');

module.exports = {
	...newEditSchema,
	required: [...newEditSchema.required, 'target']
};
