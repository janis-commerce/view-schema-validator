'use strict';

const { properties, required, newEditSchema } = require('../edit-new/schema');
const themes = require('../common/status-themes');

module.exports = {
	...newEditSchema,
	properties: {
		...properties,
		themes,
		source: {
			$ref: 'schemaDefinitions#/definitions/endpoint'
		}
	},
	required: [...required, 'source']
};
