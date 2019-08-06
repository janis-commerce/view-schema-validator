'use strict';

const EventEmitter = require('events');
const Builder = require('./builder');

const event = new EventEmitter();

event.on('error', e => {
	console.log(e);
	process.exit(1);
});


class ViewSchemaValidator {
	constructor(input, output) {
		this.input = input;
		this.output = output;
	}

	build() {
		return this.executeBuilder(true);
	}

	validate() {
		return this.executeBuilder(false);
	}

	async executeBuilder(build) {
		try {
			const builder = new Builder(this.input, this.output);
			const execute = builder.execute.bind(builder);

			return await execute(build);
		} catch(error) {
			event.emit('error', error);
		}
	}

	execute(action) {
		return this[action]();
	}
}

module.exports = ViewSchemaValidator;
