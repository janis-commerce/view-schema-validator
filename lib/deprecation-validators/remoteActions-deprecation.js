'use strict';

const { getDaysToRemoveFeatureMessage, isEdit } = require('../helpers');

module.exports = class RemoteActionsDeprecation {

	static getDayToRemove() {
		return '07/15/2023';
	}

	static getDeprecatedMessage() {

		return `The property \`remoteActions\` is going to be deprecated. ${getDaysToRemoveFeatureMessage(this.getDayToRemove())}`;
	}

	static validate(schema) {

		if(isEdit(schema))
			return JSON.stringify(schema).indexOf('remoteActions') === -1;
	}
};
