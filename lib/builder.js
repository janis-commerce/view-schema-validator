'use strict';

const fs = require('fs-extra');
const path = require('path');
const ymljs = require('yamljs');
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

	async proccesFile(filePath, isInitialPathFile = false) {
		if(this.regexExtensions.test(filePath)) {
			const file = await fs.readFile(filePath);

			const fileName = path.basename(filePath);
			const fileContent = file.toString();

			const prefix = isInitialPathFile ? path.dirname(filePath) : this.inputPath;

			const prefixPath = filePath.replace(prefix, '').replace(this.regexExtensions, '');

			const isYaml = /\.yml|\.yaml/g.test(fileName);

			const data = isYaml ? ymljs.parse(fileContent) : JSON.parse(fileContent);

			const dataFormated = Validator.execute(data, this.build, filePath);

			if(this.build) {
				const newFile = await this.proccesOutput(dataFormated, prefixPath);
				console.log('Builded', newFile);
			}
		}
	}

	async proccesInput(currentPath) {
		const promises = [];

		if(await this.isFile(currentPath))
			return Promise.all([this.proccesFile(currentPath, true)]);

		const dir = await fs.readdir(currentPath, { withFileTypes: true });

		dir.forEach(fileDir => {
			const dirFilePath = path.join(currentPath, fileDir.name);
			const process = fileDir.isFile() ? this.proccesFile(dirFilePath) : this.proccesInput(dirFilePath);
			promises.push(process);
		});

		return Promise.all(promises);
	}

	async proccesOutput(data, keyPath) {
		const fileName = path.basename(keyPath);
		const subfolders = path.dirname(keyPath);

		const fileOutputDirname = path.join(this.outputPath, subfolders);

		await fs.ensureDir(fileOutputDirname);

		const fileOutputPath = path.join(fileOutputDirname, `${fileName}.json`);

		await fs.writeFile(fileOutputPath, JSON.stringify(data, null, 4));

		return fileOutputPath;
	}

	clearOutputFolder() {
		return fs.emptyDir(this.outputPath);
	}

	async execute(build) {
		this.build = build;

		if(build)
			await this.clearOutputFolder();

		return this.proccesInput(this.inputPath);
	}
}

module.exports = Builder;
