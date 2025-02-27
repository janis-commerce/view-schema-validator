'use strict';

const { isDashBoard, getDaysToRemoveFeatureMessage } = require('../helpers');

module.exports = class ChartSourceDeprecation {

	static getDayToRemove() {
		return '08/26/2025';
	}

	static getDeprecatedMessage() {
		return `The property \`source\` inside graphs is deprecated. ${getDaysToRemoveFeatureMessage(this.getDayToRemove())}`;
	}

	static validate(schema) {
		if(!isDashBoard(schema) || !Array.isArray(schema.graphs))
			return true;
		return !schema.graphs.some(graph => graph.source);
	}
};
