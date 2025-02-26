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
		if(isDashBoard(schema)) {
			if(!schema.graphs || !Array.isArray(schema.graphs))
				return true;


			for(const graph of schema.graphs) {
				if(graph.source)
					return false;

			}
		}

		return true;
	}
};
