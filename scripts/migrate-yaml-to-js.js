#!/usr/bin/env node

'use strict';

const path = require('path');
const migrate = require('../lib/migrate');

const args = process.argv.slice(2);

if(args.length < 1) {
	console.log('Usage: node migrate-yaml-to-js.js <input-dir> [output-dir]');
	console.log('');
	console.log('If output-dir is omitted, .js files are created alongside the .yml files.');
	console.log('');
	console.log('Examples:');
	console.log('  node migrate-yaml-to-js.js ./view-schemas');
	console.log('  node migrate-yaml-to-js.js ./view-schemas ./view-schemas-js');
	console.log('');
	console.log('Or use the CLI:');
	console.log('  npx @janiscommerce/view-schema-validator migrate -i ./view-schemas');
	process.exit(0);
}

const inputDir = path.resolve(args[0]);
const outputDir = args[1] ? path.resolve(args[1]) : undefined;

migrate.execute(inputDir, outputDir);
