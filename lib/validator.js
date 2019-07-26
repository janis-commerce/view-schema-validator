'use strict';

const fs = require('fs');
const Ajv = require('ajv');
const ymljs = require('yamljs');
const schemas = require('./schemas');

const mock = fs.readFileSync(process.cwd() + '/lib/mocks/browse.yml');

const ajv = new Ajv({ allErrors: true, useDefaults: 'true', strictDefaults: true });

class Validator {
	constructor(input) {
		this.input = input;
	}

	compile(data) {
		const compile = ajv.compile(schemas.schema);
		compile(data);
		console.log(JSON.stringify(data, null, 4));
	}

	getSchemaData() {
		const schemaData = ymljs.parse(mock.toString());
		return schemaData;
	}

	execute() {
		const data = this.getSchemaData();

		if(data.root) {
			const valid = ajv.validate(schemas.schema, data);
			console.log(ajv.errors || '');
			if(valid)
				this.compile(data);
		}
	}
}

module.exports = Validator;
