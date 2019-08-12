#!/usr/bin/env node

'use strict';

const EventEmitter = require('events');
const logger = require('lllog')();
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

const event = new EventEmitter();

event.on('error', e => {
	logger.error(e.message || e);
	process.exit(1);
});

(async () => {
	const { input, output, _: commands } = argv;
	const [command] = commands;

	const schemaValidator = new ViewSchemaValidator(input, output, command);
	const execute = schemaValidator.execute.bind(schemaValidator);

	try {
		await execute();
	} catch(error) {
		event.emit('error', error);
	}
})();
