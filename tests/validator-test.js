'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const ymljs = require('yamljs');
const Validator = require('../lib/validator');


const schemaExampleOne = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse.json');
const schemaExpectedExampleOne = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse.json');
const schemaExampleYmlTwo = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit.yml');
const schemaExpectedExampleTwo = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit.json');

const sandbox = sinon.createSandbox();

describe('Test validation functions', () => {
	beforeEach(() => {
		sandbox.restore();
	});

	// your tests here...
	it('Should error if pass schema with root not defined', async () => {
		const schema = JSON.parse(schemaExampleOne.toString());
		delete schema.root;

		assert.throws(
			() => Validator.execute(schema, true, '/test/data.json'),
			{ message: 'root property not defined in /test/data.json' }
		);
	});

	it('Should error if has a error validation', async () => {
		const schema = JSON.parse(schemaExampleOne.toString());
		delete schema.name;

		assert.throws(() => Validator.execute(schema, true, '/test/data.json'));
	});

	it('Should validate only', async () => {
		const schema = JSON.parse(schemaExampleOne.toString());
		const validateSpy = sandbox.spy(Validator, 'validate');
		const compileSpy = sandbox.spy(Validator, 'compile');

		const data = Validator.execute(schema, false, '/test/data.json');

		assert(validateSpy.calledOnce);
		assert(compileSpy.notCalled);
		assert(data === undefined);
	});

	it('Should compile and validate', async () => {
		const schema = JSON.parse(schemaExampleOne.toString());
		const validateSpy = sandbox.spy(Validator, 'validate');
		const compileSpy = sandbox.spy(Validator, 'compile');

		Validator.execute(schema, true, '/test/data.json');

		assert(validateSpy.calledOnce);
		assert(compileSpy.calledOnce);
	});

	it('Should compile if schema is valid', async () => {
		const schema = JSON.parse(schemaExampleOne.toString());
		delete schema.name;

		const validateSpy = sandbox.spy(Validator, 'validate');
		const compileSpy = sandbox.spy(Validator, 'compile');

		assert.throws(() => Validator.execute(schema, true, '/test/data.json'));

		assert(validateSpy.calledOnce);
		assert(compileSpy.notCalled);
	});

	it('should schema builded is a expected', async () => {
		const schemaOne = JSON.parse(schemaExampleOne.toString());
		const schemaTwo = ymljs.parse(schemaExampleYmlTwo.toString());

		const dataOne = Validator.execute(schemaOne, true, '/test/data1.json');
		const dataTwo = Validator.execute(schemaTwo, true, '/test/data2.json');

		sandbox.assert.match(dataOne, JSON.parse(schemaExpectedExampleOne.toString()));
		sandbox.assert.match(dataTwo, JSON.parse(schemaExpectedExampleTwo.toString()));
	});
});
