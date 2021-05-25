'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const mock = require('mock-fs');
const chokidar = require('chokidar');

const { EventEmitter } = require('events');

const Builder = require('../lib/builder');
const Validator = require('../lib/validator');

const ViewSchemaValidator = require('./../lib');

const editSchemaExampleYML = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit.yml');
const newSchemaExampleTwoYML = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/new.yml');
const browseSchemaExampleJSON = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse.json');

let writeFileStub;

const executeInstance = (build = true, watch = false) => {

	const schemaValidator = new ViewSchemaValidator(
		'/tests/schemas/fakeFolder',
		'/tests/schemas/fakeBuildFolder',
		undefined,
		false,
		watch,
		build ? 'build' : 'validate',
		'local'
	);
	return schemaValidator.execute.bind(schemaValidator);
};

const mockfs = () => {
	mock({
		'tests/schemas/fakeFolder': mock.directory({
			items: {
				'edit.yml': mock.file({ content: editSchemaExampleYML.toString() }),
				'browse.json': mock.file({ content: browseSchemaExampleJSON.toString() }),
				more: mock.directory({
					items: {
						'new.yml': mock.file({ content: newSchemaExampleTwoYML.toString() }),
						'test.js': mock.file({ content: 'file js' })
					}
				})
			}
		})
	}, { createCwd: true, createTmp: false });
};

describe('test builder multiple files', () => {
	afterEach(() => {
		sinon.restore();
		mock.restore();
	});

	beforeEach(() => {
		const firstPath = process.cwd() + '/tests/schemas/fakeFolder';
		const secondPath = process.cwd() + '/tests/schemas/fakeFolder/more';

		const readdirStub = sinon.stub(fs, 'readdir');

		readdirStub.withArgs(firstPath)
			.returns([
				{ name: 'edit.yml', isFile: () => true },
				{ name: 'browse.json', isFile: () => true },
				{ name: 'more', isFile: () => false }
			]);

		readdirStub.withArgs(secondPath)
			.returns([
				{ name: 'new.yml', isFile: () => true },
				{ name: 'test.js', isFile: () => true }
			]);

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

		mockfs();

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

		const processOutputSpy = sinon.spy(Builder.prototype, 'processOutput');

		mockfs();

		const execute = executeInstance();
		await execute();

		assert(processOutputSpy.calledThrice);
		assert(writeFileStub.calledThrice);
	});

	it('should warn if validate file invalid', async () => {
		sinon.stub(process, 'exit');
		sinon.stub(Validator, 'execute').returns({ data: 'test' });

		const processOutputSpy = sinon.spy(Builder.prototype, 'processOutput');
		const processInputSpy = sinon.spy(Builder.prototype, 'processInput');
		const processFileSpy = sinon.spy(Builder.prototype, 'processFile');

		mockfs();

		const execute = executeInstance();

		await execute();
		assert(processOutputSpy.calledThrice);
		assert(processInputSpy.calledTwice);
		assert(processFileSpy.callCount === 4);
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

		mockfs();

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
