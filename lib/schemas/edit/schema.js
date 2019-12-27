'use strict';

const newEditSchema = require('../edit-new/schema');
const themes = require('../common/status-themes');

module.exports = {
	...newEditSchema,
	properties: {
		...newEditSchema.properties,
		themes
	}
};
