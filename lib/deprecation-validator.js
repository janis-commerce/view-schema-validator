'use strict';

const logger = require('lllog')();
const emoji = require('node-emoji');
const deprecationValidators = require('./deprecation-validators');

module.exports = class DeprecationValidator {

	static execute(schema, filePath) {

		const alarm = emoji.get('rotating_light');

		Object.entries(deprecationValidators).forEach(([componentName, deprecationFuncion]) => { // eslint-disable-line no-unused-vars

			const isValid = deprecationFuncion.validate(schema, filePath);

			if(!isValid)
				return logger.warn(`${alarm}${alarm}${alarm} ${filePath} => ${deprecationFuncion.getDeprecatedMessage()} ${alarm}${alarm}${alarm}`);
		});
	}
};
