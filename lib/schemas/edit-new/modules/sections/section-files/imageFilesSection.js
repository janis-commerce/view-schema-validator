'use strict';

const { imageFilesSection } = require('../../sectionsNames');
const commonSection = require('./common');

module.exports = commonSection(imageFilesSection, {
	fileUpdateEndpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
	fileUpdateEndpointParameters: { $ref: 'schemaDefinitions#/definitions/endpointParameters' }
});
