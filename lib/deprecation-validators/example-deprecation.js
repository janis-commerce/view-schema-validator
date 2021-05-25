'use strict';

const { getDaysToRemoveFeatureMessage } = require('../helpers');

module.exports = class StaticFiltersDeprecation {

	static getDayToRemove() {
		// mm/dd/yyyy
		return '12/31/2021';
	}

	static getDeprecatedMessage() {
		return `The property \`example\` is deprecated. ${getDaysToRemoveFeatureMessage(this.getDayToRemove())}`;
	}

	static validate(schema, filePath) { // eslint-disable-line no-unused-vars
		// for validation goes here
	}
};
