'use strict';

const { imageFilesSection } = require('../../sectionsNames');
const getStaticFilters = require('../../../../common/staticFilters');
const commonSection = require('./common');

module.exports = commonSection(imageFilesSection, {
	fileUpdateEndpoint: { $ref: 'schemaDefinitions#/definitions/endpoint' },
	fileUpdateEndpointParameters: getStaticFilters()
});
