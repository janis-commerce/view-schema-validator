'use strict';

const { getDaysToRemoveFeatureMessage } = require('../helpers');

module.exports = class PathQueryDeprecation {

	static getDayToRemove() {
		return '07/01/2021';
	}

	static getDeprecatedMessage() {
		return `The property \`target: query\` in endpointParameters is deprecated. ${getDaysToRemoveFeatureMessage(this.getDayToRemove())}`;
	}

	static validate(schema) {
		return JSON.stringify(schema).indexOf('"target":"query"') === -1;
	}
};
