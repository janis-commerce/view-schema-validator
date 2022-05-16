'use strict';

const browseField = require('../browse/modules/field');
const editNewField = require('../edit-new/modules/field');
const endpoint = require('../common/endpoint');
const getEndpointParameters = require('../common/endpointParameters');
const dependencies = require('../common/dependencies');
const stringPrefix = require('../common/stringPrefix');
const autoRefresh = require('../common/autoRefresh');
const graphs = require('../common/graphs');
const modalSize = require('../common/modalSize');

module.exports = {
	$id: 'schemaDefinitions',
	definitions: {
		browseField,
		editNewField,
		endpoint,
		dependencies,
		stringPrefix,
		autoRefresh,
		modalSize,
		graphs,
		endpointParameters: getEndpointParameters()
	}
};
