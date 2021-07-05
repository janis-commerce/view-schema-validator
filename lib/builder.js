'use strict';

const fs = require('fs-extra');
const path = require('path');
const ymljs = require('yamljs');
const logger = require('lllog')();
const Validator = require('./validator');
const EndpointResolver = require('./endpoint-resolver');

class Builder {
	constructor(input, output, service, minified, env) {
		this.input = input;
		this.output = output;
		this.service = service;
		this.minified = minified;
		this.inputPath = path.join(process.cwd(), input);
		this.outputPath = output && path.join(process.cwd(), output);

		this.endpointResolver = new EndpointResolver(service, env);
		this.endpointResolver.execute.bind(this.endpointResolver);
	}

	/**
	 * Regex for check available file for validate or compile
	 */
	get regexExtensions() {
		return /\.(ya?ml|json)$/;
	}

	/**
	 * Check if path is a file
	 * @name isFile
	 * @param {string} currentPath
	 * @return {<Promise>}
	 */
	async isFile(currentPath) {
		const stat = await fs.stat(currentPath);
		return stat.isFile();
	}

	/**
	 * Check file type, parse json and validate o build with Validator.execute
	 * if params passed in Builder.execute is true call processOutput
	 * @name processFile
	 * @param {string} filePath
	 * @param {boolean} isInitialPathFile
	 * @return {<Promise>}
	 */
	async processFile(filePath, isInitialPathFile = false) {
		if(this.regexExtensions.test(filePath)) {

			const file = await fs.readFile(filePath);

			const isYaml = /\.ya?ml$/.test(filePath);

			const data = isYaml ? ymljs.parse(file.toString()) : JSON.parse(file.toString());

			// avoid errors validation sections
			if(filePath.includes('sections')) {
				const dataBuilt = this.build && await this.endpointResolver.execute(data);
				return dataBuilt && this.processOutput(dataBuilt, filePath, isInitialPathFile);
			}

			const dataValidated = Validator.execute(data, this.build, filePath);
			const dataBuilt = this.build && await this.endpointResolver.execute(dataValidated);

			return dataBuilt && this.processOutput(dataBuilt, filePath, isInitialPathFile);
		}

		logger.warn(`${filePath} is not valid.`);
	}

	/**
	 * Read input directory recursibitly
	 * and call Builder.processFile for processing file
	 * @param {string} currentPath
	 * @return {<Promise>}
	 */
	async processInput(currentPath) {
		const promises = [];

		if(await this.isFile(currentPath))
			return this.processFile(currentPath, true);

		const dir = await fs.readdir(currentPath, { withFileTypes: true });

		dir.forEach(fileDir => {
			const dirFilePath = path.join(currentPath, fileDir.name);
			const process = fileDir.isFile() ? this.processFile(dirFilePath) : this.processInput(dirFilePath);
			promises.push(process);
		});

		return Promise.all(promises);
	}

	/**
	 * Generate schema output directories and files
	 * with parsed schemas
	 * @param {object} data
	 * @param {string} filePath
	 * @param {boolean} isInitialPathFile
	 */
	async processOutput(data, filePath, isInitialPathFile) {
		logger.info(`BUILDING --> ${filePath}`);

		const replaced = isInitialPathFile ? path.dirname(filePath) : this.inputPath;
		const keyPath = filePath.replace(replaced, '').replace(this.regexExtensions, '.json');

		const fileName = path.basename(keyPath);
		const subfolders = path.dirname(keyPath);

		// Create subfolders
		const fileOutputDirname = path.join(this.outputPath, subfolders);
		await fs.ensureDir(fileOutputDirname);

		// Create new file
		const fileOutputPath = path.join(fileOutputDirname, fileName);

		await fs.writeFile(fileOutputPath, JSON.stringify(data, null, this.minified ? 0 : 4));

		logger.info(`BUILT  --> ${fileOutputPath}`);
	}

	/**
	 * Clear output folder
	 * @name clearOutputFolder
	 */
	clearOutputFolder() {
		return fs.emptyDir(this.outputPath);
	}

	/**
	 * 	Handler for call processInput for validate or compile schemas
	 * @name execute
	 * @param {boolean} build
	 */
	async execute(build) {
		this.build = build;

		if(build)
			await this.clearOutputFolder();

		return this.processInput(this.inputPath);
	}
}

module.exports = Builder;
