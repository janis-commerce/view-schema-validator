'use strict';

const { imageFilesSection } = require('../../sectionsNames');
const getEndpointParameters = require('../../../../common/endpointParameters');
const commonSection = require('./common');

module.exports = commonSection(imageFilesSection, {
	fileUpdateEndpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
	fileUpdateEndpointParameters: getEndpointParameters()
});
