'use strict';

const idTextField = require('./partials/fields/idText.partial.json');
const browseSection = require('./partials/sections/browse.partial.js');

module.exports = {
	service: 'sac',
	name: 'claim-motive-edit',
	root: 'Edit',
	source: {
		service: 'sac',
		namespace: 'claim-motive',
		method: 'get',
		resolve: false
	},
	sections: [
		{
			name: 'mainFormSection',
			rootComponent: 'MainForm',
			icon: 'catalogue',
			fieldsGroup: [
				{
					name: 'detail',
					position: 'left',
					icon: 'catalogue',
					collapsible: true,
					defaultOpen: true,
					fields: [
						idTextField,
						{
							name: 'name',
							component: 'Input'
						},
						{
							name: 'descriptionTwo',
							component: 'Textarea'
						}
					]
				}
			]
		},
		browseSection
	]
};
