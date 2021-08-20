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
	.option('service', {
		alias: 's',
		type: 'string',
		describe: 'write a service local for resolve endpoints'
	})
	.option('schemasFolder', {
		alias: 'f',
		type: 'string',
		describe: 'write a folder name where contain schemas',
		default: 'view-schemas'
	})
	.option('env', {
		alias: 'e',
		type: 'string',
		describe: 'write a current environment',
		default: 'local'
	})
	.option('minified', {
		alias: 'm',
		type: 'boolean',
		default: false
	})
	.option('watch', {
		alias: 'w',
		type: 'boolean',
		default: false
	})
	.strict()
	.help('help');

const ViewSchemaValidator = require('./lib');

(async () => {
	const {
		input,
		output,
		minified,
		watch,
		env,
		schemasFolder,
		service,
		_: commands
	} = argv;

	const [command] = commands;

	const schemaValidator = new ViewSchemaValidator(
		input,
		output,
		service,
		minified,
		schemasFolder,
		watch,
		command,
		env
	);

	const execute = schemaValidator.execute.bind(schemaValidator);

	try {
		await execute();
	} catch(error) {
		logger.error(error.stack || error);

		if(error.errors)
			error.errors.map(e => logger.error(e));

		process.exit(1);
	}
})();
