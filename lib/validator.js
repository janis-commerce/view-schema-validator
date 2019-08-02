'use strict';

const fs = require('fs');
const Ajv = require('ajv');
const ymljs = require('yamljs');
const schemas = require('./schemas');
const schemaDefinitions = require('./schemas/definitions');

// const mock = fs.readFileSync(process.cwd() + '/lib/mocks/browse.yml');

const ajv = new Ajv({ allErrors: true, useDefaults: true, schemas: [schemaDefinitions] });

class Validator {
	constructor(input) {
		this.input = input;
		this.data = {};
	}

	compile(data) {
		const compile = ajv.compile(this.currentSchema);
		compile(data);
		console.log(JSON.stringify(data, null, 4));
	}

	readFiles(path) {
		try {

			const files = fs.readdirSync(path);

			files.forEach(fileName => {
				if(/\.yml|\.yaml|\.json/g.test(fileName)) {
					const isInitialPath = this.initialPath === path;
					const file = fs.readFileSync(path + '/' + fileName);

					const prefixPath = isInitialPath ? '' : path.split(this.initialPath).pop() + '__';

					if(/\.yml|\.yaml/g.test(fileName))
						this.data[`${prefixPath}${fileName}`] = ymljs.parse(file.toString());
					else
						this.data[`${prefixPath}${fileName}`] = JSON.parse(file.toString());
				} else
					this.readFiles(path + fileName);
			});

		} catch(error) {
			console.log('error', error);
		}
	}

	schemaData() {
		this.initialPath = process.cwd() + this.input;
		this.readFiles(this.initialPath);

		console.log(this.data);

		return {};
	}

	execute() {
		const data = this.schemaData();

		if(data.root) {
			this.currentSchema = schemas[data.root.toLowerCase()];

			const valid = ajv.validate(this.currentSchema, data);

			console.log(ajv.errors || '');

			if(valid)
				this.compile(data);
		}
	}
}

module.exports = Validator;
