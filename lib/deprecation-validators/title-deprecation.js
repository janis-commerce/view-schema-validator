'use strict';

const { isEdit, getDaysToRemoveFeatureMessage } = require('../helpers');

module.exports = class TitleDeprecation {

	static getDayToRemove() {
		return '09/01/2021';
	}

	static getDeprecatedMessage() {
		return `The properties \`identifier\`, \`beforeId\` and \`afterId\` in header are deprecated. ${getDaysToRemoveFeatureMessage(this.getDayToRemove())}`; // eslint-disable-line max-len
	}

	static validate(schema) {

		if(isEdit(schema)) {

			if(!schema.header || !schema.header.title)
				return true;

			if(schema.header.title.identifier || schema.header.title.beforeId || schema.header.title.afterId)
				return false;
		}

		return true;
	}
};
