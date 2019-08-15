'use strict';

const Builder = require('./builder');

class ViewSchemaValidator {
	constructor(input, output, minified, command) {
		this.command = command;
		this.input = input;
		this.minified = minified;
		this.output = output;
	}

	/**
	 * Create builder instance and return execute fn called with param passed
	 * @name executeBuilder
	 * @param {boolean} build
	 * @return {<Promise>}
	 */
	executeBuilder(build) {
		const builder = new Builder(this.input, this.output, this.minified);
		const execute = builder.execute.bind(builder);
		return execute(build);
	}

	/**
	 * 	Validate if pass input, output and command valids,
	 * 	then call Builder for read files and validate or build schemas
	 * @name execute
	 * @return {<Promise>}
	 */
	execute() {
		const isValid = srt => srt.trim();

		const build = this.command === 'build';

		if(build && !isValid(this.output))
			throw new Error('Please add output');

		if(!isValid(this.input))
			throw new Error('Please add input');

		return this.executeBuilder(build);
	}
}

module.exports = ViewSchemaValidator;
