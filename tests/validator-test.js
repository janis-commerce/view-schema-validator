'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const ymljs = require('yamljs');
const Validator = require('../lib/validator');

const browseSchemaJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse.json');
const browseSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse.json');
const editSchemaYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit.yml');
const editSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit.json');
const dashboardSchemaYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/dashboard.yml');
const dashboardSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/dashboard.json');

describe('Test validation functions', () => {
	beforeEach(() => {
		sinon.restore();
	});

	it('Should error if pass schema with root not defined', () => {
		const schema = JSON.parse(browseSchemaJson.toString());
		delete schema.root;

		assert.throws(
			() => Validator.execute(schema, true, '/test/data.json'),
			{ message: 'root property not defined in /test/data.json' }
		);
	});

	it('Should error if has a error validation', () => {
		const schema = JSON.parse(browseSchemaJson.toString());
		delete schema.name;

		assert.throws(() => Validator.execute(schema, true, '/test/data.json'));
	});

	it('Should validate only', () => {
		const schema = JSON.parse(browseSchemaJson.toString());
		const validateSpy = sinon.spy(Validator, 'validate');
		const compileSpy = sinon.spy(Validator, 'compile');

		const data = Validator.execute(schema, false, '/test/data.json');

		assert(validateSpy.calledOnce);
		assert(compileSpy.notCalled);
		assert(data === undefined);
	});

	it('Should compile and validate', () => {
		const schema = JSON.parse(browseSchemaJson.toString());
		const validateSpy = sinon.spy(Validator, 'validate');
		const compileSpy = sinon.spy(Validator, 'compile');

		Validator.execute(schema, true, '/test/data.json');

		assert(validateSpy.calledOnce);
		assert(compileSpy.calledOnce);
	});

	it('Should compile if schema is valid', () => {
		const schema = JSON.parse(browseSchemaJson.toString());
		delete schema.name;

		const validateSpy = sinon.spy(Validator, 'validate');
		const compileSpy = sinon.spy(Validator, 'compile');

		assert.throws(() => Validator.execute(schema, true, '/test/data.json'));

		assert(validateSpy.calledOnce);
		assert(compileSpy.notCalled);
	});

	it('should schema builded is a expected', () => {
		const schemaOne = JSON.parse(browseSchemaJson.toString());
		const schemaTwo = ymljs.parse(editSchemaYml.toString());
		const schemaThree = ymljs.parse(dashboardSchemaYml.toString());

		const dataOne = Validator.execute(schemaOne, true, '/test/data1.json');
		const dataTwo = Validator.execute(schemaTwo, true, '/test/data2.json');
		const dataThree = Validator.execute(schemaThree, true, '/test/data3.json');

		sinon.assert.match(dataOne, JSON.parse(browseSchemaExpectedJson.toString()));
		sinon.assert.match(dataTwo, JSON.parse(editSchemaExpectedJson.toString()));
		sinon.assert.match(dataThree, JSON.parse(dashboardSchemaExpectedJson.toString()));
	});

	it('should error with default schema', () => {
		const schemaOne = { url: 'http://janis.in' };
		const schemaTwo = { root: 5, url: 'http://janis.in' };

		assert.throws(() => Validator.execute(schemaOne, true, '/test/data.json'));
		assert.throws(() => Validator.execute(schemaTwo, true, '/test/data.json'));
	});

	it('should pass validation and build data with default schema', () => {
		const validateSpy = sinon.spy(Validator, 'validate');
		const compileSpy = sinon.spy(Validator, 'compile');

		const schema = { root: 'Terminal', url: 'http://janis.in' };

		Validator.execute(schema, true, '/test/data.json');

		assert(validateSpy.calledOnce);
		assert(compileSpy.calledOnce);
	});

});
