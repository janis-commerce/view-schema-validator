'use strict';

const idTextField = require('../fields/idText.partial.json');

module.exports = {
	name: 'someBrowse',
	rootComponent: 'BrowseSection',
	source: {
		service: 'sac',
		namespace: 'claim-semaphore',
		method: 'browse',
		resolve: false
	},
	fields: [
		idTextField,
		{
			name: 'name',
			component: 'BoldText'
		},
		{
			name: 'color',
			component: 'Text'
		}
	]
};
