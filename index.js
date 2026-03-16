#!/usr/bin/env node

'use strict';

const path = require('path');
const logger = require('lllog')();
const yargs = require('yargs');

const ViewSchemaValidator = require('./lib');
const migrate = require('./lib/migrate');
const packageJson = require('./package.json');

const commonOptions = {
	input: {
		alias: 'i',
		describe: 'write a relative dir for your inputs files folder or file',
		type: 'string',
		demandOption: true
	}
};

const { argv } = yargs
	.command('build', 'Build view schemas', y => {
		y.options({
			...commonOptions,
			output: {
				alias: 'o',
				type: 'string',
				describe: 'write a relative dir for outputs'
			},
			service: {
				alias: 's',
				type: 'string',
				describe: 'write a service local for resolve endpoints'
			},
			env: {
				alias: 'e',
				type: 'string',
				describe: 'write a current environment',
				default: 'local'
			},
			minified: {
				alias: 'm',
				type: 'boolean',
				default: false
			},
			watch: {
				alias: 'w',
				type: 'boolean',
				default: false
			}
		});
	})
	.command('validate', 'Validate view schemas', y => {
		y.options({
			...commonOptions,
			output: {
				alias: 'o',
				type: 'string',
				describe: 'write a relative dir for outputs'
			},
			service: {
				alias: 's',
				type: 'string',
				describe: 'write a service local for resolve endpoints'
			},
			env: {
				alias: 'e',
				type: 'string',
				describe: 'write a current environment',
				default: 'local'
			},
			minified: {
				alias: 'm',
				type: 'boolean',
				default: false
			},
			watch: {
				alias: 'w',
				type: 'boolean',
				default: false
			}
		});
	})
	.command('migrate', 'Migrate YAML view schemas to JS modules', y => {
		y.options({
			...commonOptions,
			output: {
				alias: 'o',
				type: 'string',
				describe: 'output directory for converted JS files (default: alongside YAML files)'
			}
		});
	})
	.demandCommand()
	.strict()
	.help('help');

(async () => {

	logger.info(`Package version: ${packageJson.version}`);

	const {
		input,
		output,
		minified,
		watch,
		env,
		service,
		_: commands
	} = argv;

	const [command] = commands;

	if(command === 'migrate') {
		const inputDir = path.resolve(input);
		const outputDir = output ? path.resolve(output) : undefined;
		return migrate.execute(inputDir, outputDir);
	}

	const schemaValidator = new ViewSchemaValidator(
		input,
		output,
		service,
		minified,
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
