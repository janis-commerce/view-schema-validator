'use strict';

const browseField = require('../browse/modules/field');
const editNewField = require('../edit-new/modules/field');
const endpoint = require('../common/endpoint');
const getEndpointParameters = require('../common/endpointParameters');
const dependencies = require('../common/dependencies');
const graphs = require('../common/graphs');

module.exports = {
	$id: 'schemaDefinitions',
	definitions: {
		browseField,
		editNewField,
		endpoint,
		dependencies,
		graphs,
		endpointParameters: getEndpointParameters()
	}
};
