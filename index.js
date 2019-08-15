#!/usr/bin/env node

'use strict';

const logger = require('lllog')();
const { argv } = require('yargs')
	.command('build')
	.command('validate')
	.demandCommand()
	.option('input', {
		alias: 'i',
		describe: 'write a relative dir for your inputs files folder or file',
		type: 'string',
		demandOption: true
	})
	.option('output', {
		alias: 'o',
		type: 'string',
		describe: 'write a relative dir for outputs'
	})
	.strict()
	.help('help');

const ViewSchemaValidator = require('./lib');

(async () => {
	const { input, output, _: commands } = argv;
	const [command] = commands;

	const schemaValidator = new ViewSchemaValidator(input, output, command);
	const execute = schemaValidator.execute.bind(schemaValidator);

	try {
		await execute();
	} catch(error) {
		logger.error(error.stack || error);
		process.exit(1);
	}
})();
