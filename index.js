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
		describe: 'write the name of the folder where the partials schemes are',
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
const packageJson = require('./package.json');

const mapErrorToLogLine = (errorItem, index) => {
	if(typeof errorItem === 'string')
		return errorItem;

	const message = errorItem && (errorItem.message || errorItem.stack);

	if(message)
		return `[${index + 1}] ${message}`;

	return `[${index + 1}] ${JSON.stringify(errorItem)}`;
};

(async () => {

	logger.info(`Package version: ${packageJson.version}`);

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

		if(error.errors) {
			error.errors
				.map(mapErrorToLogLine)
				.map(errorLine => logger.error(errorLine));
		}

		process.exit(1);
	}
})();
