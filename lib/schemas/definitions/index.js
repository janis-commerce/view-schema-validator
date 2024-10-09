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
const template = require('../common/template');
const featureFlags = require('../common/featureFlags');
const redirect = require('../common/redirect');
const canCreate = require('../common/canCreate');
const width = require('../common/width');

module.exports = {
	$id: 'schemaDefinitions',
	definitions: {
		browseField,
		editNewField,
		endpoint,
		redirect,
		dependencies,
		stringPrefix,
		autoRefresh,
		modalSize,
		template,
		graphs,
		endpointParameters: getEndpointParameters(),
		featureFlags,
		canCreate,
		width
	}
};
