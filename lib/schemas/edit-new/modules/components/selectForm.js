'use strict';

const { makeComponent } = require('../../../utils');
const componentsNames = require('../componentNames');
const remoteOptions = require('../options/remoteOptions');
const getCanCreateProps = require('../can-create');

const { selectForm } = componentsNames;

const remoteProps = { ...remoteOptions.then.properties };
const remotePropsKeys = Object.keys(remoteProps).filter(k => k !== 'scope');

const optionsProps = remotePropsKeys.reduce((accum, key) => {
	return { ...accum, [key]: remoteProps[key] };
}, {});

module.exports = makeComponent({
	name: selectForm,
	properties: {
		translateLabels: { type: 'boolean' },
		labelPrefix: { $ref: 'schemaDefinitions#/definitions/stringPrefix' },
		labelFieldName: { type: 'string' },
		canClear: { type: 'boolean' },
		icon: { type: 'string' },
		canEdit: { type: 'boolean' },
		canCreate: getCanCreateProps(),
		options: {
			...remoteOptions.then,
			type: 'object',
			properties: optionsProps
		},
		fields: {
			type: 'array',
			items: {
				$ref: 'schemaDefinitions#/definitions/editNewField'
			},
			minItems: 1
		}
	},
	requiredProperties: ['translateLabels', 'fields', 'options']
});
