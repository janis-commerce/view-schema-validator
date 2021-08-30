'use strict';

const { isEdit, isPreview, getDaysToRemoveFeatureMessage } = require('../helpers');

module.exports = class TitleComponentsDeprecation {

	static getDayToRemove() {
		return '09/15/2021';
	}

	static getDeprecatedMessage() {
		return `The components \`IdText\`, \`DefaultTitle\` and  \`CustomTitle\` in header are deprecated. ${getDaysToRemoveFeatureMessage(this.getDayToRemove())}`; // eslint-disable-line max-len
	}

	static validate(schema) {

		if(isEdit(schema) || isPreview(schema)) {

			if(!schema.header || !schema.header.title)
				return true;

			const isArrayTitle = Array.isArray(schema.header.title);

			if(isArrayTitle || schema.header.title.components) {
				const components = isArrayTitle ? schema.header.title : schema.header.title.components;

				const hasDeprecatedComponents = components.some(({ component }) => /IdText|DefaultTitle|CustomTitle/g.test(component));
				return !hasDeprecatedComponents;
			}
		}

		return true;
	}
};
