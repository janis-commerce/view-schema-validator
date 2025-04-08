'use strict';

const link = require('./link');

// Edit page section topComponents callbacks
const sectionCallbacks = ['reloadSectionData'];
// Browse page topComponents callbacks
const pageBrowseCallbacks = ['reloadBrowse'];

/**
 * Make callback schema for diferent places
 * @param {boolean} options - Function options for make schema
 * @param {boolean} options.isBrowsePage - Is a Browse page
 * @param {array} options.customCallbacks - List of custom callbacks
 * @returns {object}
 */
module.exports = ({ isBrowsePage, customCallbacks }) => ({
	oneOf: [
		{
			type: 'string',
			enum: [
				'refresh',
				'openLink',
				'reloadData',
				'openModal',
				...customCallbacks || (isBrowsePage ? pageBrowseCallbacks : sectionCallbacks)
			]
		},
		{
			type: 'object',
			allOf: [
				{
					if: {
						properties: {
							name: { const: 'redirect' }
						}
					},
					then: {
						properties: {
							name: { const: 'redirect' },
							props: {
								type: 'object',
								properties: {
									target: { enum: ['_blank', '_self'] },
									...link.properties
								},
								required: ['path'],
								additionalProperties: false
							}
						},
						required: ['props']
					}
				},
				{
					if: {
						properties: {
							name: { const: 'openLink' }
						}
					},
					then: {
						properties: {
							name: { const: 'openLink' },
							props: {
								type: 'object',
								properties: {
									fieldName: { type: 'string' }
								},
								required: ['fieldName'],
								additionalProperties: false
							}
						},
						required: ['props']
					}
				}
			]
		}
	]
});
