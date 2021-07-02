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

const schemaExampleYML = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit.yml');
const schemaExampleTwoYML = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/new.yml');
const schemaExampleJSON = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse.json');

const sandbox = sinon.createSandbox();

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
				'edit.yml': mock.file({ content: schemaExampleYML.toString() }),
				'browse.json': mock.file({ content: schemaExampleJSON.toString() }),
				more: mock.directory({
					items: {
						'new.yml': mock.file({ content: schemaExampleTwoYML.toString() }),
						'test.js': mock.file({ content: 'file js' })
					}
				}),
				sections: mock.directory({
					items: {
						'section.yml': mock.file({ content: schemaExampleTwoYML.toString() })
					}
				})
			}
		})
	}, { createCwd: true, createTmp: false });
};

describe('test builder multiple files', () => {
	afterEach(() => {
		sandbox.restore();
		mock.restore();
	});

	beforeEach(() => {
		const firstPath = process.cwd() + '/tests/schemas/fakeFolder';
		const secondPath = process.cwd() + '/tests/schemas/fakeFolder/more';
		const thirdPath = process.cwd() + '/tests/schemas/fakeFolder/sections';

		const readdirStub = sandbox.stub(fs, 'readdir');

		readdirStub.withArgs(firstPath)
			.returns([
				{ name: 'edit.yml', isFile: () => true },
				{ name: 'browse.json', isFile: () => true },
				{ name: 'more', isFile: () => false },
				{ name: 'sections', isFile: () => false }
			]);

		readdirStub.withArgs(secondPath)
			.returns([
				{ name: 'new.yml', isFile: () => true },
				{ name: 'test.js', isFile: () => true }
			]);

		readdirStub.withArgs(thirdPath)
			.returns([
				{ name: 'section.yml', isFile: () => true }
			]);

		writeFileStub = sandbox.stub(fs, 'writeFile');

		sandbox.stub(fs, 'emptyDir');

		sandbox.stub(chokidar, 'watch');
	});

	it('should error if pass a inexist input ', async () => {
		sandbox.stub(process, 'exit');

		const isFileSpy = sandbox.spy(Builder.prototype, 'isFile');

		const execute = executeInstance();

		await assert.rejects(async () => { await execute(); });

		const call = isFileSpy.getCall(0);

		assert(isFileSpy.calledOnce);
		await assert.rejects(async () => call.returnValue);
	});

	it('Should exec clearOutputFolder if is build and before processInputs', async () => {
		sandbox.stub(process, 'exit');
		sandbox.stub(Validator, 'execute');

		const clearOutputFolderStub = sandbox.stub(Builder.prototype, 'clearOutputFolder');
		const processInputStub = sandbox.stub(Builder.prototype, 'processInput');

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
		sandbox.stub(process, 'exit');
		sandbox.stub(Validator, 'execute').returns({ data: 'test' });

		const processOutputSpy = sandbox.spy(Builder.prototype, 'processOutput');

		mockfs();

		const execute = executeInstance();
		await execute();

		assert(processOutputSpy.callCount === 4);
		assert(writeFileStub.callCount === 4);
	});

	it('should warn if validate file invalid', async () => {
		sandbox.stub(process, 'exit');
		sandbox.stub(Validator, 'execute').returns({ data: 'test' });

		const processOutputSpy = sandbox.spy(Builder.prototype, 'processOutput');
		const processInputSpy = sandbox.spy(Builder.prototype, 'processInput');
		const processFileSpy = sandbox.spy(Builder.prototype, 'processFile');

		mockfs();

		const execute = executeInstance();

		await execute();

		assert(processOutputSpy.callCount === 4);
		assert(processInputSpy.calledThrice);
		assert(processFileSpy.callCount === 5);
	});

	it('Should watch input path and execute on ready and change events', async () => {

		sandbox.stub(process, 'exit');
		sandbox.stub(Validator, 'execute').returns({ data: 'test' });

		const buildSpy = sandbox.spy(Builder.prototype, 'execute');

		class MyEventEmitter extends EventEmitter {}

		const eventEmitter = new MyEventEmitter();

		sandbox.spy(eventEmitter, 'on');

		const on = (...args) => {
			eventEmitter.on(...args);
			return { on };
		};
		chokidar.watch.returns({ on });

		mockfs();

		const execute = executeInstance(true, true);
		await execute();

		sandbox.assert.calledOnce(chokidar.watch);
		sandbox.assert.notCalled(buildSpy);

		eventEmitter.emit('notWatchedEvent');
		sandbox.assert.notCalled(buildSpy);

		eventEmitter.emit('ready');
		sandbox.assert.calledOnce(buildSpy);

		eventEmitter.emit('change');
		sandbox.assert.calledTwice(buildSpy);

		sandbox.assert.alwaysCalledWith(buildSpy, true);
	});

});
