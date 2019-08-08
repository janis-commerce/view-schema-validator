'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs');
const mock = require('mock-fs');
const Builder = require('../lib/builder');
const Validator = require('../lib/validator');
const { ViewSchemaValidator } = require('./../lib');

const invalidSchema = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/valid/edit.yml');

const sandbox = sinon.createSandbox();


describe.only('test builder', () => {
	afterEach(() => {
		sandbox.restore();
		mock.restore();
	});

	it('should error if pass a inexist input ', async () => {
		sandbox.stub(process, 'exit');

		const isFileSpy = sandbox.spy(Builder.prototype, 'isFile');

		const schemaValidator = new ViewSchemaValidator('/tests/schemas/fakeFolder', '/tests/schemas/fakeFolder', 'validate');
		const execute = schemaValidator.execute.bind(schemaValidator);

		await assert.rejects(async () => { await execute(); });

		const call = isFileSpy.getCall(0);

		assert(isFileSpy.calledOnce);
		await assert.rejects(async () => call.returnValue);
	});

	it('should error if exist validation error', async () => {

		mock({
			[`${process.cwd()}/tests/schemas/fakeFolder`]: mock.directory({
				items: {
					'edit.yml': invalidSchema.toString()
				}
			})
		});

		sandbox.stub(process, 'exit');
		sandbox.stub(Validator, 'execute').rejects();

		const schemaValidator = new ViewSchemaValidator('/tests/schemas/fakeFolder', '/tests/schemas/fakeFolder', 'validate');
		const execute = schemaValidator.execute.bind(schemaValidator);

		await assert.rejects(async () => { await execute(); });


	});
});
