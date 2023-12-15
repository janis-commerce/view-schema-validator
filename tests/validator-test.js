'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const ymljs = require('yamljs');
const Validator = require('../lib/validator');

const browseSchemaJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse.json');
const browseSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse.json');
const browseSchemaCountDownJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse-countDown.json');
const browseSchemaCountDownExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse-countDown.json');
const browseSchemaColumnSortableMatchJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse-columnSortableMatch.json');
const browseSchemaColumnSortableMatchxpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse-columnSortableMatch.json');
const editSchemaYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit.yml');
const editSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit.json');
const editWithActionsSchemaYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit-with-actions.yml');
const editWithActionsSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-actions.json');
const editWithActionsStaticSchemaYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit-with-actions-static.yml');
const editWithActionsStaticSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-actions-static.json');
const editWithActionsSourceSchemaYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit-with-actions-source.yml');
const editWithActionsSourceSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-actions-source.json');
const editWithCanCreateSchemaYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit-with-canCreate-object.yml');
const editWithCanCreateExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-canCreate-object.json');
const editWithMinMaxInputSchemaYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit-with-min-max-input.yml');
const editWithMinMaxInputSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-min-max-input.json');
const editWithRemoteActionsSchemaYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit-with-remote-actions.yml');
const editWithRemoteActionsSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-remote-actions.json');
const newSchemaYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/new.yml');
const newWithMinMaxInputSchemaYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/new-with-min-max-input.yml');
const newSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/new.json');
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
		const browseCountDownSchema = JSON.parse(browseSchemaCountDownJson.toString());
		const browseColumnSortableMatchSchema = JSON.parse(browseSchemaColumnSortableMatchJson.toString());
		const editSchema = ymljs.parse(editSchemaYml.toString());
		const editWithActionsSchema = ymljs.parse(editWithActionsSchemaYml.toString());
		const editWithActionsStaticSchema = ymljs.parse(editWithActionsStaticSchemaYml.toString());
		const editWithActionsSourceSchema = ymljs.parse(editWithActionsSourceSchemaYml.toString());
		const editWithCanCreateSchema = ymljs.parse(editWithCanCreateSchemaYml.toString());
		const editWithMinMaxInputSchema = ymljs.parse(editWithMinMaxInputSchemaYml.toString());
		const editWithRemoteActionsSchema = ymljs.parse(editWithRemoteActionsSchemaYml.toString());
		const newSchema = ymljs.parse(newSchemaYml.toString());
		const newWithMinMaxInputSchema = ymljs.parse(newWithMinMaxInputSchemaYml.toString());

		const dashboardSchema = ymljs.parse(dashboardSchemaYml.toString());
		const previewSchema = ymljs.parse(previewSchemaYml.toString());
		const sectionSchema = ymljs.parse(sectionExampleYML.toString());
		const monitorSchema = ymljs.parse(monitorSchemaYml.toString());

		const browseData = Validator.execute(browseSchema, true, '/test/data1.json');
		const browseCountDownData = Validator.execute(browseCountDownSchema, true, '/test/data1.json');
		const browseColumnSortableMatchData = Validator.execute(browseColumnSortableMatchSchema, true, '/test/data1.json');
		const editData = Validator.execute(editSchema, true, '/test/data2.json');
		const editWithActionsData = Validator.execute(editWithActionsSchema, true, '/test/data7.json');
		const editWithActionsStaticData = Validator.execute(editWithActionsStaticSchema, true, '/test/data8.json');
		const editWithActionsSourceData = Validator.execute(editWithActionsSourceSchema, true, '/test/data9.json');
		const editWithCanCreateData = Validator.execute(editWithCanCreateSchema, true, '/test/data13.json');
		const editWithRemoteActionsData = Validator.execute(editWithRemoteActionsSchema, true, '/test/data10.json');
		const editWithMinMaxInputData = Validator.execute(editWithMinMaxInputSchema, true, '/test/data11.json');
		const newData = Validator.execute(newSchema, true, '/test/data6.json');
		const newWithMinMaxInputData = Validator.execute(newWithMinMaxInputSchema, true, '/test/data12.json');
		const dashboardData = Validator.execute(dashboardSchema, true, '/test/data3.json');
		const previewData = Validator.execute(previewSchema, true, '/test/data4.json');
		const sectionData = Validator.execute(sectionSchema, true, '/test/data5.json');
		const monitorData = Validator.execute(monitorSchema, true, '/test/data4.json');

		sinon.assert.match(browseData, JSON.parse(browseSchemaExpectedJson.toString()));
		sinon.assert.match(browseCountDownData, JSON.parse(browseSchemaCountDownExpectedJson.toString()));
		sinon.assert.match(browseColumnSortableMatchData, JSON.parse(browseSchemaColumnSortableMatchxpectedJson.toString()));
		sinon.assert.match(editData, JSON.parse(editSchemaExpectedJson.toString()));
		sinon.assert.match(editWithActionsData, JSON.parse(editWithActionsSchemaExpectedJson.toString()));
		sinon.assert.match(editWithActionsStaticData, JSON.parse(editWithActionsStaticSchemaExpectedJson.toString()));
		sinon.assert.match(editWithActionsSourceData, JSON.parse(editWithActionsSourceSchemaExpectedJson.toString()));
		sinon.assert.match(editWithCanCreateData, JSON.parse(editWithCanCreateExpectedJson.toString()));
		sinon.assert.match(editWithMinMaxInputData, JSON.parse(editWithMinMaxInputSchemaExpectedJson.toString()));
		sinon.assert.match(editWithRemoteActionsData, JSON.parse(editWithRemoteActionsSchemaExpectedJson.toString()));
		sinon.assert.match(newData, JSON.parse(newSchemaExpectedJson.toString()));
		sinon.assert.match(newWithMinMaxInputData, JSON.parse(newSchemaExpectedJson.toString()));
		sinon.assert.match(dashboardData, JSON.parse(dashboardSchemaExpectedJson.toString()));
		sinon.assert.match(previewData, JSON.parse(previewSchemaExpected.toString()));
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
