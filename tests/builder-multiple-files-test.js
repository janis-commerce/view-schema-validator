'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const chokidar = require('chokidar');

const { EventEmitter } = require('events');

const Builder = require('../lib/builder');
const Validator = require('../lib/validator');

const ViewSchemaValidator = require('./../lib');

let writeFileStub;

const executeInstance = (build = true, watch = false, inputPath) => {

	const schemaValidator = new ViewSchemaValidator(
		inputPath || '/tests/schemas/fakeFolder',
		'/tests/schemas/fakeBuildFolder',
		undefined,
		false,
		undefined,
		watch,
		build ? 'build' : 'validate',
		'local'
	);
	return schemaValidator.execute.bind(schemaValidator);
};

describe('test builder multiple files', () => {
	afterEach(() => {
		sinon.restore();
	});

	beforeEach(() => {
		writeFileStub = sinon.stub(fs, 'writeFile');

		sinon.stub(fs, 'emptyDir');

		sinon.stub(chokidar, 'watch');
	});

	it('should error if pass a inexist input ', async () => {
		sinon.stub(process, 'exit');

		const isFileSpy = sinon.spy(Builder.prototype, 'isFile');

		const execute = executeInstance();

		await assert.rejects(async () => { await execute(); });

		const call = isFileSpy.getCall(0);

		assert(isFileSpy.calledOnce);
		await assert.rejects(async () => call.returnValue);
	});

	it('Should exec clearOutputFolder if is build and before processInputs', async () => {
		sinon.stub(process, 'exit');
		sinon.stub(Validator, 'execute');

		const clearOutputFolderStub = sinon.stub(Builder.prototype, 'clearOutputFolder');
		const processInputStub = sinon.stub(Builder.prototype, 'processInput');

		const executeOne = executeInstance();
		await executeOne();

		assert(clearOutputFolderStub.calledBefore(processInputStub));
		assert(processInputStub.calledOnce);

		clearOutputFolderStub.reset();
		processInputStub.reset();

		const executeTwo = executeInstance(false);
		await executeTwo();

		assert(clearOutputFolderStub.notCalled);
		assert(processInputStub.calledOnce);
	});

	it('Should pass validation with path directory', async () => {
		sinon.stub(process, 'exit');
		sinon.stub(Validator, 'execute').returns({ data: 'test' });
		sinon.stub(Builder.prototype, 'loadFile').returns({ root: 'Browse', name: 'test', service: 'test' });

		const firstPath = process.cwd() + '/tests/schemas/fakeFolder';
		const secondPath = process.cwd() + '/tests/schemas/fakeFolder/more';
		const thirdPath = process.cwd() + '/tests/schemas/fakeFolder/sections';

		const statStub = sinon.stub(fs, 'stat');
		statStub.resolves({ isFile: () => false });

		const readdirStub = sinon.stub(fs, 'readdir');

		readdirStub.withArgs(firstPath, sinon.match.any)
			.resolves([
				{ name: 'edit.js', isFile: () => true },
				{ name: 'browse.json', isFile: () => true },
				{ name: 'more', isFile: () => false },
				{ name: 'sections', isFile: () => false },
				{ name: 'fields.partial.json', isFile: () => true },
				{ name: 'fields2.partial.js', isFile: () => true }
			]);

		readdirStub.withArgs(secondPath, sinon.match.any)
			.resolves([
				{ name: 'new.js', isFile: () => true },
				{ name: 'test.txt', isFile: () => true }
			]);

		readdirStub.withArgs(thirdPath, sinon.match.any)
			.resolves([
				{ name: 'section.js', isFile: () => true }
			]);

		const processOutputSpy = sinon.spy(Builder.prototype, 'processOutput');

		const execute = executeInstance();
		await execute();

		assert(processOutputSpy.callCount === 4);
		assert(writeFileStub.callCount === 4);
	});

	it('should warn if validate file invalid', async () => {
		sinon.stub(process, 'exit');
		sinon.stub(Validator, 'execute').returns({ data: 'test' });
		sinon.stub(Builder.prototype, 'loadFile').returns({ root: 'Browse', name: 'test', service: 'test' });

		const firstPath = process.cwd() + '/tests/schemas/fakeFolder';
		const secondPath = process.cwd() + '/tests/schemas/fakeFolder/more';
		const thirdPath = process.cwd() + '/tests/schemas/fakeFolder/sections';

		const statStub = sinon.stub(fs, 'stat');
		statStub.resolves({ isFile: () => false });

		const readdirStub = sinon.stub(fs, 'readdir');

		readdirStub.withArgs(firstPath, sinon.match.any)
			.resolves([
				{ name: 'edit.js', isFile: () => true },
				{ name: 'browse.json', isFile: () => true },
				{ name: 'more', isFile: () => false },
				{ name: 'sections', isFile: () => false },
				{ name: 'fields.partial.json', isFile: () => true },
				{ name: 'fields2.partial.js', isFile: () => true }
			]);

		readdirStub.withArgs(secondPath, sinon.match.any)
			.resolves([
				{ name: 'new.js', isFile: () => true },
				{ name: 'test.txt', isFile: () => true }
			]);

		readdirStub.withArgs(thirdPath, sinon.match.any)
			.resolves([
				{ name: 'section.js', isFile: () => true }
			]);

		const processOutputSpy = sinon.spy(Builder.prototype, 'processOutput');
		const processInputSpy = sinon.spy(Builder.prototype, 'processInput');
		const processFileSpy = sinon.spy(Builder.prototype, 'processFile');

		const execute = executeInstance();

		await execute();

		assert(processOutputSpy.callCount === 4);
		assert(processInputSpy.calledThrice);
		assert(processFileSpy.callCount === 5);
	});

	it('Should watch input path and execute on ready and change events', async () => {

		sinon.stub(process, 'exit');
		sinon.stub(Validator, 'execute').returns({ data: 'test' });

		const buildSpy = sinon.spy(Builder.prototype, 'execute');

		class MyEventEmitter extends EventEmitter {}

		const eventEmitter = new MyEventEmitter();

		sinon.spy(eventEmitter, 'on');

		const on = (...args) => {
			eventEmitter.on(...args);
			return { on };
		};
		chokidar.watch.returns({ on });

		const execute = executeInstance(true, true);
		await execute();

		sinon.assert.calledOnce(chokidar.watch);
		sinon.assert.notCalled(buildSpy);

		eventEmitter.emit('notWatchedEvent');
		sinon.assert.notCalled(buildSpy);

		eventEmitter.emit('ready');
		sinon.assert.calledOnce(buildSpy);

		eventEmitter.emit('change');
		sinon.assert.calledTwice(buildSpy);

		sinon.assert.alwaysCalledWith(buildSpy, true);
	});

});
