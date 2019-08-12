'use strict';

const fs = require('fs-extra');
const path = require('path');
const ymljs = require('yamljs');
const logger = require('lllog')();
const Validator = require('./validator');

class Builder {
	constructor(input, output) {
		this.input = input;
		this.output = output;

		this.inputPath = path.join(process.cwd(), input);
		this.outputPath = path.join(process.cwd(), output);
	}

	get regexExtensions() {
		return /\.yml|\.yaml|\.json/g;
	}

	async isFile(currentPath) {
		const stat = await fs.stat(currentPath);
		return stat.isFile();
	}

	async processFile(filePath, isInitialPathFile = false) {
		if(this.regexExtensions.test(filePath)) {
			const file = await fs.readFile(filePath);

			const fileName = path.basename(filePath);

			const fileContent = file.toString();

			const replaced = isInitialPathFile ? path.dirname(filePath) : this.inputPath;

			const prefixPath = filePath.replace(replaced, '').replace(this.regexExtensions, '');

			const isYaml = /\.yml|\.yaml/g.test(fileName);

			const data = isYaml ? ymljs.parse(fileContent) : JSON.parse(fileContent);

			const dataFormated = Validator.execute(data, this.build, filePath);

			return this.build && this.processOutput(dataFormated, prefixPath, filePath);
		}

		logger.warn(`${filePath} is not valid.`);
	}

	async processInput(currentPath) {
		const promises = [];

		if(await this.isFile(currentPath))
			return Promise.all([this.processFile(currentPath, true)]);

		const dir = await fs.readdir(currentPath, { withFileTypes: true });

		dir.forEach(fileDir => {
			const dirFilePath = path.join(currentPath, fileDir.name);
			const process = fileDir.isFile() ? this.processFile(dirFilePath) : this.processInput(dirFilePath);
			promises.push(process);
		});

		return Promise.all(promises);
	}

	async processOutput(data, keyPath, initialFilePath) {
		logger.info(`BUILDING --> ${initialFilePath}`);

		const fileName = path.basename(keyPath);
		const subfolders = path.dirname(keyPath);

		const fileOutputDirname = path.join(this.outputPath, subfolders);

		await fs.ensureDir(fileOutputDirname);

		const fileOutputPath = path.join(fileOutputDirname, `${fileName}.json`);

		await fs.writeFile(fileOutputPath, JSON.stringify(data, null, 4));

		logger.info(`BUILDED --> ${fileOutputPath}`);
	}

	clearOutputFolder() {
		return fs.emptyDir(this.outputPath);
	}

	async execute(build) {
		this.build = build;

		if(build)
			await this.clearOutputFolder();

		return this.processInput(this.inputPath);
	}
}

module.exports = Builder;
