'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const mock = require('mock-fs');
const Builder = require('../lib/builder');
const Validator = require('../lib/validator');
const ViewSchemaValidator = require('./../lib');

const editSchemaExampleYML = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit.yml');
const browseSchemaExampleJSON = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse.json');

let writeFileStub;

const executeInstance = (build = true, file, minified = false) => {
	const schemaValidator = new ViewSchemaValidator(
		`/tests/schemas/fakeFolder/${file || ''}`,
		'/tests/schemas/fakeBuildFolder',
		undefined,
		minified,
		undefined,
		false,
		build ? 'build' : 'validate',
		'local'
	);
	return schemaValidator.execute.bind(schemaValidator);
};

const mockfs = items => {
	mock({
		'tests/schemas/fakeFolder': mock.directory({
			items: items || { 'edit.yml': mock.file({ content: editSchemaExampleYML.toString() }) }
		})
	}, { createCwd: true, createTmp: false });
};

describe('test builder single files', () => {

	afterEach(() => {
		sinon.restore();
		mock.restore();
	});

	beforeEach(() => {
		sinon.stub(fs, 'readdir').returns([{ name: 'edit.yml', isFile: () => true }]);
		writeFileStub = sinon.stub(fs, 'writeFile');
		sinon.stub(fs, 'emptyDir');
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

	it('should error if exist validation error', async () => {
		sinon.stub(process, 'exit');
		sinon.stub(Validator, 'execute').throws();

		const processInputSpy = sinon.spy(Builder.prototype, 'processInput');
		const processFileSpy = sinon.spy(Builder.prototype, 'processFile');

		mockfs();

		const execute = executeInstance();

		await assert.rejects(async () => { await execute(); });

		assert(processInputSpy.calledOnce);
		assert(processFileSpy.calledOnce);
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

	it('Should pass validation with input path directory', async () => {
		sinon.stub(process, 'exit');
		sinon.stub(Validator, 'execute').returns({ data0: 'test', data1: 'test', data2: 'test' });

		const processOutputSpy = sinon.spy(Builder.prototype, 'processOutput');

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
		sinon.stub(process, 'exit');
		sinon.stub(Validator, 'execute').returns({ data0: 'test', data1: 'test', data2: 'test' });

		const processOutputSpy = sinon.spy(Builder.prototype, 'processOutput');
		const isFileSpy = sinon.spy(Builder.prototype, 'isFile');

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

		sinon.stub(process, 'exit');
		sinon.stub(Validator, 'execute').returns({ data0: 'test', data1: 'test', data2: 'test' });

		const processOutputSpy = sinon.spy(Builder.prototype, 'processOutput');
		const isFileSpy = sinon.spy(Builder.prototype, 'isFile');

		mockfs({ 'browse.json': mock.file({ content: browseSchemaExampleJSON.toString() }) });

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

		sinon.stub(process, 'exit');
		sinon.stub(Validator, 'execute').returns({ data0: 'test', data1: 'test', data2: 'test' });

		const processOutputSpy = sinon.spy(Builder.prototype, 'processOutput');
		const isFileSpy = sinon.spy(Builder.prototype, 'isFile');

		mockfs({ 'browse.json': mock.file({ content: browseSchemaExampleJSON.toString() }) });

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
