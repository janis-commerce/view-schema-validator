'use strict';

const fs = require('fs-extra');
const Ajv = require('ajv');
const ymljs = require('yamljs');
const schemas = require('./schemas');
const schemaDefinitions = require('./schemas/definitions');

const ajv = new Ajv({ allErrors: true, useDefaults: true, schemas: [schemaDefinitions] });

class Validator {
	constructor(input, output) {
		this.input = input;
		this.output = output;

		this.inputPath = `${process.cwd()}${input}`;
		this.outputPath = `${process.cwd()}${output}`;

		this.data = {};
	}

	get regexExtensions() {
		return /\.yml|\.yaml|\.json/g;
	}

	isFile(path) {
		const stat = fs.statSync(path);
		return stat.isFile();
	}

	normalizePathDir(path) {
		const hasPathSlash = path[path.length - 1] !== '/' ? '/' : '';
		return `${path}${hasPathSlash}`;
	}

	async proccesFile(filePath, isInitialPathFile = false) {
		if(this.regexExtensions.test(filePath)) {
			const file = await fs.readFile(filePath);

			let prefix;
			if(isInitialPathFile) {
				const fileName = this.initialPath.split('/').pop();
				prefix = this.initialPath.replace(fileName, '');
			}

			const prefixPath = filePath
				.split(isInitialPathFile ? prefix : this.normalizePathDir(this.initialPath))
				.pop()
				.replace(this.regexExtensions, '');

			const stringFile = file.toString();

			if(/\.yml|\.yaml/g.test(filePath))
				this.data[prefixPath] = ymljs.parse(stringFile);
			else
				this.data[prefixPath] = JSON.parse(stringFile);
		}
	}

	proccesInput(path) {
		try {
			if(this.isFile(path))
				return this.proccesFile(path, true);

			const files = fs.readdirSync(path);

			files.forEach(fileName => {
				const dirPath = `${this.normalizePathDir(path)}${fileName}`;

				if(this.isFile(dirPath))
					this.proccesFile(dirPath);
				else
					this.proccesInput(this.normalizePathDir(dirPath));
			});
		} catch(error) {
			console.error('\x1b[31m', error);
		}
	}

	proccesOutput(data, keyPath) {
		const parts = keyPath.split('/');

		const fileName = parts.pop();

		const subFoldersPaths = parts.join('/');

		const subfolders = subFoldersPaths && this.normalizePathDir(subFoldersPaths);

		const mainPath = process.cwd() + this.normalizePathDir(this.output);

		if(!fs.existsSync(mainPath))
			fs.ensureDirSync(mainPath);

		if(subfolders)
			fs.ensureDirSync(`${mainPath}${subfolders}`);

		const path = `${mainPath}${subfolders}${fileName}.json`;

		fs.writeFileSync(path, JSON.stringify(data, null, 4));
	}

	clearOutputFolder() {
		const mainPath = `${process.cwd()}${this.output}`;
		fs.emptyDirSync(mainPath);
	}

	processData() {
		this.initialPath = process.cwd() + this.input;
		this.proccesInput(this.initialPath);

		return this.data;
	}

	compile(data, keyPath) {
		const compile = ajv.compile(this.currentSchema);
		compile(data);

		this.proccesOutput(data, keyPath);
	}


	execute() {
		let clear = true;
		const data = this.processData();
		const dataKeys = Object.keys(data);

		dataKeys.forEach(key => {
			const dataItem = data[key];

			if(dataItem.root) {
				this.currentSchema = schemas[dataItem.root.toLowerCase()];

				const valid = ajv.validate(this.currentSchema, dataItem);

				console.log(ajv.errors || '');

				if(clear) {
					this.clearOutputFolder();
					clear = false;
				}

				if(valid)
					this.compile(dataItem, key);
			}

		});
	}
}

module.exports = Validator;
