'use strict';

const newEditSchema = require('../create/schema');

module.exports = {
	...newEditSchema,
	if: {
		properties: {
			redirect: {
				const: false
			}
		}
	},
	then: { required: [...newEditSchema.then.required, 'target'] }
};
