'use strict';

const assert = require('assert');
const sinon = require('sinon');

const { ViewSchemaValidator } = require('./../lib');
const Builder = require('../lib/builder');

const sandbox = sinon.createSandbox();

describe('Test execute commmand initials', () => {
	beforeEach(() => {
		sandbox.restore();
	});

	// your tests here...
	it('Should error if pass input empty or true', async () => {
		const execSpy = sandbox.spy(ViewSchemaValidator.prototype, 'execute');

		const schemaValidatorOne = new ViewSchemaValidator(true, '/build', 'build');
		const executeOne = schemaValidatorOne.execute.bind(schemaValidatorOne);

		await assert.rejects(async () => { await executeOne(); }, { message: 'Please add input' });
		assert(execSpy.calledOnce);

		sandbox.restore();

		const schemaValidatorTwo = new ViewSchemaValidator('', '/build', 'build');
		const executeTwo = schemaValidatorTwo.execute.bind(schemaValidatorTwo);

		await assert.rejects(async () => { await executeTwo(); }, { message: 'Please add input' });
		assert(execSpy.calledOnce);
	});

	it('Should error if pass output empty or true', async () => {
		const execSpy = sandbox.spy(ViewSchemaValidator.prototype, 'execute');

		const schemaValidatorOne = new ViewSchemaValidator('/mocks', true, 'build');
		const executeOne = schemaValidatorOne.execute.bind(schemaValidatorOne);

		await assert.rejects(async () => { await executeOne(); }, { message: 'Please add output' });
		assert(execSpy.calledOnce);

		sandbox.restore();

		const schemaValidatorTwo = new ViewSchemaValidator('/mocks', '', 'build');
		const executeTwo = schemaValidatorTwo.execute.bind(schemaValidatorTwo);

		await assert.rejects(async () => { await executeTwo(); }, { message: 'Please add output' });
		assert(execSpy.calledOnce);
	});

	it('Should error if pass output and input empty or true', async () => {
		const execSpy = sandbox.spy(ViewSchemaValidator.prototype, 'execute');

		const schemaValidatorOne = new ViewSchemaValidator('', true, 'build');
		const executeOne = schemaValidatorOne.execute.bind(schemaValidatorOne);

		await assert.rejects(async () => { await executeOne(); }, { message: 'Please add input and output' });
		assert(execSpy.calledOnce);

		sandbox.restore();

		const schemaValidatorTwo = new ViewSchemaValidator(true, '', 'build');
		const executeTwo = schemaValidatorTwo.execute.bind(schemaValidatorTwo);

		await assert.rejects(async () => { await executeTwo(); }, { message: 'Please add input and output' });
		assert(execSpy.calledOnce);
	});

	it('Should error if pass command invalid', async () => {
		const execSpy = sandbox.spy(ViewSchemaValidator.prototype, 'execute');

		const schemaValidator = new ViewSchemaValidator('/mocks', '/build', 'compile');
		const execute = schemaValidator.execute.bind(schemaValidator);

		await assert.rejects(async () => { await execute(); }, { message: 'Command "compile" not exist' });
		assert(execSpy.calledOnce);
	});

	it('Should execute validate', async () => {
		sandbox.stub(Builder.prototype, 'execute');

		const execSpy = sandbox.spy(ViewSchemaValidator.prototype, 'execute');
		const builderSpy = sandbox.spy(ViewSchemaValidator.prototype, 'executeBuilder');

		const schemaValidator = new ViewSchemaValidator('/test/mocks/schemas', '/test/mocks/build', 'validate');

		const execute = schemaValidator.execute.bind(schemaValidator);

		await execute();

		assert(execSpy.calledOnce);
		assert(builderSpy.calledOnce);
		assert(builderSpy.calledWith(false));
	});

	it('Should execute build', async () => {
		sandbox.stub(Builder.prototype, 'execute');

		const execSpy = sandbox.spy(ViewSchemaValidator.prototype, 'execute');
		const builderSpy = sandbox.spy(ViewSchemaValidator.prototype, 'executeBuilder');

		const schemaValidator = new ViewSchemaValidator('/tests/mocks/schemas', '/tests/mocks/build', 'build');

		const execute = schemaValidator.execute.bind(schemaValidator);

		await execute();

		assert(execSpy.calledOnce);
		assert(builderSpy.calledOnce);
		assert(builderSpy.calledWith(true));
	});

	it('Should error in execute build', async () => {
		sandbox.stub(Builder.prototype, 'execute').rejects();

		const execSpy = sandbox.spy(ViewSchemaValidator.prototype, 'execute');
		const builderSpy = sandbox.spy(ViewSchemaValidator.prototype, 'executeBuilder');

		const schemaValidator = new ViewSchemaValidator('/tests/mocks/schemas', '/tests/mocks/build', 'build');

		const execute = schemaValidator.execute.bind(schemaValidator);


		await assert.rejects(async () => { await execute(); });

		assert(execSpy.calledOnce);
		assert(builderSpy.calledOnce);
		assert(builderSpy.calledWith(true));
	});

});
