'use strict';

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
									path: { type: 'string' },
									target: { enum: ['_blank', '_self'] },
									endpointParameters: {
										$ref: 'schemaDefinitions#/definitions/endpointParameters'
									}
								},
								required: ['path'],
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
