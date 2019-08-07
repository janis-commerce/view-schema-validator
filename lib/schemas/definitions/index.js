'use strict';

const browseField = require('../browse/modules/field');
const editNewField = require('../edit-new/modules/field');
const endpoint = require('../common/endpoint');

module.exports = {
	$id: 'schemaDefinitions',
	definitions: {
		browseField,
		editNewField,
		endpoint
	}
};
