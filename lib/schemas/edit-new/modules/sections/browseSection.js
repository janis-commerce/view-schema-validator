'use strict';

const getBrowseBaseSchema = require('../../../common/browseBase');
const { browseSection } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: browseSection }
		}
	},
	then: {
		properties: {
			...getBrowseBaseSchema(),
			title: { type: 'string' },
			name: { type: 'string' },
			rootComponent: { type: 'string', const: browseSection },
			sourceField: { type: 'string' }
		},
		required: ['name', 'rootComponent', 'source', 'fields'],
		additionalProperties: false
	}
};
