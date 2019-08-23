'use strict';

const assert = require('assert');
const sinon = require('sinon');

const ViewSchemaValidator = require('./../lib');
const Builder = require('../lib/builder');

const sandbox = sinon.createSandbox();

describe('Test execute commmand initials', () => {
	beforeEach(() => {
		sandbox.restore();
	});

	// your tests here...
	it('Should error if pass input empty string', async () => {
		const execSpy = sandbox.spy(ViewSchemaValidator.prototype, 'execute');

		const schemaValidatorOne = new ViewSchemaValidator(' ', '/build', undefined, false, 'build');
		const executeOne = schemaValidatorOne.execute.bind(schemaValidatorOne);

		await assert.rejects(async () => { await executeOne(); }, { message: 'Please add input' });
		assert(execSpy.calledOnce);
	});

	it('Should error if pass output empty string', async () => {
		const execSpy = sandbox.spy(ViewSchemaValidator.prototype, 'execute');

		const schemaValidatorOne = new ViewSchemaValidator('/mocks', '', undefined, false, 'build');
		const executeOne = schemaValidatorOne.execute.bind(schemaValidatorOne);

		await assert.rejects(async () => { await executeOne(); }, { message: 'Please add output' });
		assert(execSpy.calledOnce);

		sandbox.restore();

		const schemaValidatorTwo = new ViewSchemaValidator('/mocks', ' ', undefined, false, 'build');
		const executeTwo = schemaValidatorTwo.execute.bind(schemaValidatorTwo);

		await assert.rejects(async () => { await executeTwo(); }, { message: 'Please add output' });
		assert(execSpy.calledOnce);
	});

	it('Should error if pass service invalid', async () => {
		const execSpy = sandbox.spy(ViewSchemaValidator.prototype, 'execute');

		const schemaValidatorOne = new ViewSchemaValidator('/mocks', '/build', ' ', false, 'build');
		const executeOne = schemaValidatorOne.execute.bind(schemaValidatorOne);

		await assert.rejects(async () => { await executeOne(); }, { message: 'Please add valid service' });
		assert(execSpy.calledOnce);
	});

	it('Should pass validation if pass output empty or true in validation', async () => {
		const executeBuilderStub = sandbox.stub(ViewSchemaValidator.prototype, 'executeBuilder');

		const execSpy = sandbox.spy(ViewSchemaValidator.prototype, 'execute');

		const schemaValidatorOne = new ViewSchemaValidator('/mocks', ' ', undefined, false, 'validate');
		const executeOne = schemaValidatorOne.execute.bind(schemaValidatorOne);

		await executeOne();

		assert(execSpy.calledOnce);
		assert(executeBuilderStub.calledOnce);

		const schemaValidatorTwo = new ViewSchemaValidator('/mocks', '', undefined, false, 'validate');
		const executeTwo = schemaValidatorTwo.execute.bind(schemaValidatorTwo);

		await executeTwo();

		assert(execSpy.calledTwice);
		assert(executeBuilderStub.calledTwice);
	});

	it('Should execute validate', async () => {
		sandbox.stub(Builder.prototype, 'execute');

		const execSpy = sandbox.spy(ViewSchemaValidator.prototype, 'execute');
		const builderSpy = sandbox.spy(ViewSchemaValidator.prototype, 'executeBuilder');

		const schemaValidator = new ViewSchemaValidator('/test/mocks/schemas', '/test/mocks/build', undefined, false, 'validate');

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

		const schemaValidator = new ViewSchemaValidator('/tests/mocks/schemas', '/tests/mocks/build', undefined, false, 'build');

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

		const schemaValidator = new ViewSchemaValidator('/tests/mocks/schemas', '/tests/mocks/build', undefined, false, 'build');

		const execute = schemaValidator.execute.bind(schemaValidator);


		await assert.rejects(async () => { await execute(); });

		assert(execSpy.calledOnce);
		assert(builderSpy.calledOnce);
		assert(builderSpy.calledWith(true));
	});

});
