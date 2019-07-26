#!/usr/bin/env node

'use strict';

const { argv } = require('yargs')
	.command('build')
	.command('validate')
	.demandCommand()
	.option('input', {
		alias: 'i',
		describe: 'write a relative dir for your inputs files folder or file'
	})
	.option('output', {
		alias: 'o',
		describe: 'write a relative dir for outputs'
	})
	.help('help');


const { ViewSchemaValidator } = require('./lib');

const availableCommands = ['build', 'validate'];

(() => {
	const { input, output, _: commands } = argv;

	if(input && output) {
		const [command] = commands;
		const currentCommand = availableCommands.find(cmd => cmd === command);

		const schemaValidator = new ViewSchemaValidator(input, output);
		const execute = schemaValidator.execute.bind(schemaValidator);

		if(currentCommand)
			execute(currentCommand.toLowerCase());
	}
})();
