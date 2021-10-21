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
const previewSchemaYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/preview.yml');
const previewSchemaExpected = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/preview.json');
const sectionExampleYML = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/section-example.yml');
const sectionExampleExpected = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/section-example.json');
const monitorSchemaYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/monitor.yml');
const monitorSchemaExpected = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/monitor.json');

describe('Test validation functions', () => {

	beforeEach(() => {
		sinon.restore();
	});

	it('Should error if pass schema with root not defined', () => {
		const schema = JSON.parse(browseSchemaJson.toString());
		delete schema.root;

		assert.throws(
			() => Validator.execute(schema, true, '/test/data.json'),
			{ message: 'root or rootComponent property not defined in /test/data.json' }
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

		const browseSchema = JSON.parse(browseSchemaJson.toString());
		const editSchema = ymljs.parse(editSchemaYml.toString());
		const dashboardSchema = ymljs.parse(dashboardSchemaYml.toString());
		const previeSchema = ymljs.parse(previeSchemaYml.toString());
    const sectionSchema = ymljs.parse(sectionExampleYML.toString());
		const monitorSchema = ymljs.parse(monitorSchemaYml.toString());

		const browseData = Validator.execute(browseSchema, true, '/test/data1.json');
		const editData = Validator.execute(editSchema, true, '/test/data2.json');
		const dashboardData = Validator.execute(dashboardSchema, true, '/test/data3.json');
		const previewData = Validator.execute(previeSchema, true, '/test/data4.json');
    const sectionData = Validator.execute(sectionSchema, true, '/test/data5.json');
		const previewData = Validator.execute(previewSchema, true, '/test/data4.json');
    const monitorData = Validator.execute(monitorSchema, true, '/test/data4.json');

		sinon.assert.match(browseData, JSON.parse(browseSchemaExpectedJson.toString()));
		sinon.assert.match(editData, JSON.parse(editSchemaExpectedJson.toString()));
		sinon.assert.match(dashboardData, JSON.parse(dashboardSchemaExpectedJson.toString()));
		sinon.assert.match(previewData, JSON.parse(previeSchemaExpected.toString()));
		sinon.assert.match(sectionData, JSON.parse(sectionExampleExpected.toString()));
    sinon.assert.match(monitorData, JSON.parse(monitorSchemaExpected.toString()));
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
