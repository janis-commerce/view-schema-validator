'use strict';

const Validator = require('./validator');

class ViewSchemaValidator {
	constructor(input, output) {
		this.input = input;
		this.output = output;
	}

	build() {
		console.log('building');
		this.validate();
	}

	validate() {
		const validator = new Validator(this.input, this.output);
		const execute = validator.execute.bind(validator);

		try {
			execute();
		} catch(error) {
			console.log(error);
		}

		process.exit(1);
	}

	execute(action) {
		this[action]();
	}
}

module.exports = ViewSchemaValidator;
