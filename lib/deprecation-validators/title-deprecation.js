'use strict';

const { isEdit, isPreview, getDaysToRemoveFeatureMessage } = require('../helpers');

module.exports = class TitleDeprecation {

	static getDayToRemove() {
		return '09/15/2021';
	}

	static getDeprecatedMessage() {
		return `The properties \`identifier\`, \`beforeId\`, \`afterId\` and \`components\` in header are deprecated. ${getDaysToRemoveFeatureMessage(this.getDayToRemove())}`; // eslint-disable-line max-len
	}

	static validate(schema) {

		if(isEdit(schema) || isPreview(schema)) {

			if(!schema.header || !schema.header.title)
				return true;

			const { identifier, beforeId, afterId, components } = schema.header.title;

			if(identifier || beforeId || afterId || components)
				return false;

		}

		return true;
	}
};
