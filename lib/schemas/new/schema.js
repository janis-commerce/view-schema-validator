'use strict';

const newEditSchema = require('../edit-new/schema');

module.exports = {
	...newEditSchema,
	else: { required: [...newEditSchema.else.required, 'target'] }
};
