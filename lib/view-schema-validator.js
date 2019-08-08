'use strict';

const Builder = require('./builder');

class ViewSchemaValidator {
	constructor(input, output, command) {
		this.command = command;
		this.input = input;
		this.output = output;
	}

	get availableCommands() {
		return ['build', 'validate'];
	}

	async executeBuilder(build) {
		const builder = new Builder(this.input, this.output);
		const execute = builder.execute.bind(builder);

		return execute(build);
	}

	execute() {
		const exist = data => typeof data === 'string' && data.trim();

		const hasInput = exist(this.input);
		const hasOutput = exist(this.output);

		if(hasInput && hasOutput) {
			const currentCommand = this.availableCommands.find(cmd => cmd === this.command);

			if(currentCommand) {
				const build = this.command.toLowerCase() === 'build';

				return this.executeBuilder(build);
			}

			throw new Error(`Command "${this.command}" not exist`);
		}

		throw new Error(`Please add ${!hasInput ? 'input' : 'output'}${!hasInput && !hasOutput ? ' and output' : ''}`);
	}
}

module.exports = ViewSchemaValidator;
