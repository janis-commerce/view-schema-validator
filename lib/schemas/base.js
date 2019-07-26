'use strict';

const endpoint = require('./common/endpoint');
const editNewSchema = require('./edit-new/schema');
const browseSchema = require('./browse/schema');

module.exports = {
	type: 'object',
	properties: {
		root: { enum: ['Browse', 'New', 'Edit'] },
		service: { type: 'string' },
		name: { type: 'string' },
		title: { type: 'string' },
		source: endpoint
	},
	allOf: [
		browseSchema,
		editNewSchema
	],
	required: ['root', 'name', 'service', 'source']
};
