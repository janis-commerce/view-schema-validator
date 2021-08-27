'use strict';

const assert = require('assert');
const sinon = require('sinon');

const ViewSchemaValidator = require('./../lib');
const Builder = require('../lib/builder');

describe('Test execute commmand initials', () => {

	afterEach(() => {
		sinon.restore();
	});

	it('Should error if pass input empty string', async () => {
		const execSpy = sinon.spy(ViewSchemaValidator.prototype, 'execute');

		const schemaValidatorOne = new ViewSchemaValidator(' ', '/build', undefined, false, undefined, false, 'build', 'local');
		const executeOne = schemaValidatorOne.execute.bind(schemaValidatorOne);

		await assert.rejects(async () => { await executeOne(); }, { message: 'Please add input' });
		assert(execSpy.calledOnce);
	});

	it('Should error if pass output empty string', async () => {
		const execSpy = sinon.spy(ViewSchemaValidator.prototype, 'execute');

		const schemaValidatorOne = new ViewSchemaValidator('/mocks', '', undefined, false, undefined, false, 'build', 'local');
		const executeOne = schemaValidatorOne.execute.bind(schemaValidatorOne);

		await assert.rejects(async () => { await executeOne(); }, { message: 'Please add output' });
		assert(execSpy.calledOnce);

		sinon.restore();

		const schemaValidatorTwo = new ViewSchemaValidator('/mocks', ' ', undefined, false, undefined, false, 'build', 'local');
		const executeTwo = schemaValidatorTwo.execute.bind(schemaValidatorTwo);

		await assert.rejects(async () => { await executeTwo(); }, { message: 'Please add output' });
		assert(execSpy.calledOnce);
	});

	it('Should error if pass service invalid', async () => {
		const execSpy = sinon.spy(ViewSchemaValidator.prototype, 'execute');

		const schemaValidatorOne = new ViewSchemaValidator('/mocks', '/build', ' ', false, undefined, false, 'build', 'local');
		const executeOne = schemaValidatorOne.execute.bind(schemaValidatorOne);

		await assert.rejects(async () => { await executeOne(); }, { message: 'Please add valid service' });
		assert(execSpy.calledOnce);
	});

	it('Should pass validation if pass output empty or true in validation', async () => {
		const executeBuilderStub = sinon.stub(ViewSchemaValidator.prototype, 'executeBuilder');

		const execSpy = sinon.spy(ViewSchemaValidator.prototype, 'execute');

		const schemaValidatorOne = new ViewSchemaValidator('/mocks', ' ', undefined, false, undefined, false, 'validate', 'local');
		const executeOne = schemaValidatorOne.execute.bind(schemaValidatorOne);

		await executeOne();

		assert(execSpy.calledOnce);
		assert(executeBuilderStub.calledOnce);

		const schemaValidatorTwo = new ViewSchemaValidator('/mocks', '', undefined, false, undefined, false, 'validate', 'local');
		const executeTwo = schemaValidatorTwo.execute.bind(schemaValidatorTwo);

		await executeTwo();

		assert(execSpy.calledTwice);
		assert(executeBuilderStub.calledTwice);
	});

	it('Should execute validate', async () => {
		sinon.stub(Builder.prototype, 'execute');

		const execSpy = sinon.spy(ViewSchemaValidator.prototype, 'execute');
		const builderSpy = sinon.spy(ViewSchemaValidator.prototype, 'executeBuilder');

		const schemaValidator = new ViewSchemaValidator(
			'/test/mocks/schemas',
			'/test/mocks/build',
			undefined,
			false,
			undefined,
			false,
			'validate',
			'local'
		);

		const execute = schemaValidator.execute.bind(schemaValidator);

		await execute();

		assert(execSpy.calledOnce);
		assert(builderSpy.calledOnce);
		assert(builderSpy.calledWith(false));
	});

	it('Should execute build', async () => {
		sinon.stub(Builder.prototype, 'execute');

		const execSpy = sinon.spy(ViewSchemaValidator.prototype, 'execute');
		const builderSpy = sinon.spy(ViewSchemaValidator.prototype, 'executeBuilder');

		const schemaValidator = new ViewSchemaValidator(
			'/tests/mocks/schemas',
			'/tests/mocks/build',
			undefined,
			false,
			undefined,
			false,
			'build',
			'local'
		);

		const execute = schemaValidator.execute.bind(schemaValidator);

		await execute();

		assert(execSpy.calledOnce);
		assert(builderSpy.calledOnce);
		assert(builderSpy.calledWith(true));
	});

	it('Should error in execute build', async () => {
		sinon.stub(Builder.prototype, 'execute').rejects();

		const execSpy = sinon.spy(ViewSchemaValidator.prototype, 'execute');
		const builderSpy = sinon.spy(ViewSchemaValidator.prototype, 'executeBuilder');

		const schemaValidator = new ViewSchemaValidator(
			'/tests/mocks/schemas',
			'/tests/mocks/build',
			undefined,
			false,
			undefined,
			false,
			'build',
			'local'
		);

		const execute = schemaValidator.execute.bind(schemaValidator);

		await assert.rejects(async () => { await execute(); });

		assert(execSpy.calledOnce);
		assert(builderSpy.calledOnce);
		assert(builderSpy.calledWith(true));
	});

});
