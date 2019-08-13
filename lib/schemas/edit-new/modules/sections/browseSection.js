'use strict';

const browseBase = require('../../../common/browseBase');
const { browseSection } = require('../sectionsNames');

module.exports = {
	if: {
		properties: {
			rootComponent: { const: browseSection }
		}
	},
	then: {
		properties: {
			...browseBase,
			title: { type: 'string' },
			name: { type: 'string' },
			rootComponent: { type: 'string', const: browseSection },
			source: {
				$ref: 'schemaDefinitions#/definitions/endpoint'
			}
		},
		required: ['name', 'rootComponent', 'source', 'fields'],
		additionalProperties: false
	}
};
