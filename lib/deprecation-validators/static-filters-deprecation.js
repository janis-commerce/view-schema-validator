'use strict';

const { getDaysToRemoveFeatureMessage } = require('../helpers');

module.exports = class StaticFiltersDeprecation {

	static getDayToRemove() {
		return '09/01/2021';
	}

	static getDeprecatedMessage() {
		return `The property \`staticFilters\` in source or target is deprecated. ${getDaysToRemoveFeatureMessage(this.getDayToRemove())}`;
	}

	static validate(schema) {
		return JSON.stringify(schema).indexOf('staticFilters') === -1;
	}
};
