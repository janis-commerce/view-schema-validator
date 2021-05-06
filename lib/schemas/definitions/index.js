'use strict';

const browseField = require('../browse/modules/field');
const editNewField = require('../edit-new/modules/field');
const endpoint = require('../common/endpoint');
const getEndpointParameters = require('../common/endpointParameters');
const dependencies = require('../common/dependencies');

module.exports = {
	$id: 'schemaDefinitions',
	definitions: {
		browseField,
		editNewField,
		endpoint,
		dependencies,
		endpointParameters: getEndpointParameters()
	}
};
