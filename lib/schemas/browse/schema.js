'use strict';

const { properties, required } = require('../common/base');
const action = require('../common/actions/action');
const makeConditions = require('../common/conditions');
const getBrowseBaseSchema = require('../common/browseBase');
const makeTopComponents = require('../common/topComponents');
const makeActionCallbacks = require('../common/actionCallbacks');

const conditions = makeConditions();

const makeCustomAction = () => ({
	...action,
	properties: {
		...action.properties,
		conditions,
		callback: makeActionCallbacks({ customCallbacks: [] })
	}
});

module.exports = {
	type: 'object',
	properties: {
		...properties,
		...getBrowseBaseSchema(true),
		topComponents: makeTopComponents(true),
		root: { const: 'Browse' },
		actions: {
			type: 'array',
			items: makeCustomAction()
		}
	},
	if: {
		properties: {
			redirect: {
				const: false
			}
		}
	},
	then: {
		required: [...required, 'fields', 'source']
	},
	else: {
		required: [...required]
	},
	additionalProperties: false
};
