'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const mock = require('mock-fs');
const Builder = require('../lib/builder');
const Validator = require('../lib/validator');
const ViewSchemaValidator = require('./../lib');

const schemaExampleYML = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit.yml');
const schemaExampleJSON = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse.json');

const sandbox = sinon.createSandbox();

let writeFileStub;

const executeInstance = (build = true, file, minified = false) => {
	const schemaValidator = new ViewSchemaValidator(
		`/tests/schemas/fakeFolder/${file || ''}`,
		'/tests/schemas/fakeBuildFolder',
		undefined,
		minified,
		false,
		build ? 'build' : 'validate',
		'local'
	);
	return schemaValidator.execute.bind(schemaValidator);
};

const mockfs = items => {
	mock({
		'tests/schemas/fakeFolder': mock.directory({
			items: items || { 'edit.yml': mock.file({ content: schemaExampleYML.toString() }) }
		})
	}, { createCwd: true, createTmp: false });
};

describe('test builder single files', () => {

	afterEach(() => {
		sandbox.restore();
		mock.restore();
	});

	beforeEach(() => {
		sandbox.stub(fs, 'readdir').returns([{ name: 'edit.yml', isFile: () => true }]);
		writeFileStub = sandbox.stub(fs, 'writeFile');
		sandbox.stub(fs, 'emptyDir');
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

	it('should error if exist validation error', async () => {
		sandbox.stub(process, 'exit');
		sandbox.stub(Validator, 'execute').throws();

		const processInputSpy = sandbox.spy(Builder.prototype, 'processInput');
		const processFileSpy = sandbox.spy(Builder.prototype, 'processFile');

		mockfs();

		const execute = executeInstance();

		await assert.rejects(async () => { await execute(); });

		assert(processInputSpy.calledOnce);
		assert(processFileSpy.calledOnce);
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

	it('Should pass validation with input path directory', async () => {
		sandbox.stub(process, 'exit');
		sandbox.stub(Validator, 'execute').returns({ data0: 'test', data1: 'test', data2: 'test' });

		const processOutputSpy = sandbox.spy(Builder.prototype, 'processOutput');

		mockfs();

		const execute = executeInstance();
		await execute();

		assert(processOutputSpy.calledOnce);
		assert(writeFileStub.calledOnce);
		assert(writeFileStub.calledWithExactly(
			`${process.cwd()}/tests/schemas/fakeBuildFolder/edit.json`,
			JSON.stringify({ data0: 'test', data1: 'test', data2: 'test' }, null, 4)
		));
	});

	it('Should pass validation with input file yml path directory', async () => {
		sandbox.stub(process, 'exit');
		sandbox.stub(Validator, 'execute').returns({ data0: 'test', data1: 'test', data2: 'test' });

		const processOutputSpy = sandbox.spy(Builder.prototype, 'processOutput');
		const isFileSpy = sandbox.spy(Builder.prototype, 'isFile');

		mockfs();

		const execute = executeInstance(true, 'edit.yml');
		await execute();

		assert(processOutputSpy.calledOnce);
		assert(writeFileStub.calledOnce);
		assert(writeFileStub.calledWithExactly(
			`${process.cwd()}/tests/schemas/fakeBuildFolder/edit.json`,
			JSON.stringify({ data0: 'test', data1: 'test', data2: 'test' }, null, 4)
		));

		const call = isFileSpy.getCall(0);
		const callRes = await call.returnValue;
		assert(callRes);
	});

	it('Should pass validation with input file JSON path directory', async () => {

		sandbox.stub(process, 'exit');
		sandbox.stub(Validator, 'execute').returns({ data0: 'test', data1: 'test', data2: 'test' });

		const processOutputSpy = sandbox.spy(Builder.prototype, 'processOutput');
		const isFileSpy = sandbox.spy(Builder.prototype, 'isFile');

		mockfs({ 'browse.json': mock.file({ content: schemaExampleJSON.toString() }) });

		const execute = executeInstance(true, 'browse.json');
		await execute();

		assert(processOutputSpy.calledOnce);
		assert(writeFileStub.calledOnce);
		assert(writeFileStub.calledWithExactly(
			`${process.cwd()}/tests/schemas/fakeBuildFolder/browse.json`,
			JSON.stringify({ data0: 'test', data1: 'test', data2: 'test' }, null, 4)
		));

		const call = isFileSpy.getCall(0);
		const callRes = await call.returnValue;

		assert(callRes);
	});

	it('Should pass validation with input file minified', async () => {

		sandbox.stub(process, 'exit');
		sandbox.stub(Validator, 'execute').returns({ data0: 'test', data1: 'test', data2: 'test' });

		const processOutputSpy = sandbox.spy(Builder.prototype, 'processOutput');
		const isFileSpy = sandbox.spy(Builder.prototype, 'isFile');

		mockfs({ 'browse.json': mock.file({ content: schemaExampleJSON.toString() }) });

		const execute = executeInstance(true, 'browse.json', true);
		await execute();

		assert(processOutputSpy.calledOnce);
		assert(writeFileStub.calledOnce);
		assert(writeFileStub.calledWithExactly(
			`${process.cwd()}/tests/schemas/fakeBuildFolder/browse.json`,
			JSON.stringify({ data0: 'test', data1: 'test', data2: 'test' })
		));

		const call = isFileSpy.getCall(0);
		const callRes = await call.returnValue;

		assert(callRes);
	});

});
