'use strict';

const browseField = require('../browse/modules/field');
const endpoint = require('../common/endpoint');

module.exports = {
	$id: 'schemaDefinitions',
	definitions: {
		browseField,
		endpoint
	}
};
