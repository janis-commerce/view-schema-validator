'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const Validator = require('../lib/validator');

const browseSchemaJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse.json');
const browseSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse.json');
const browseWithCanCreateSchemaJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse-with-can-create.json');
const browseWithCanCreateSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse-with-can-create.json');
const browseSchemaCountDownJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse-countDown.json');
const browseSchemaCountDownExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse-countDown.json');
const browseSchemaColumnSortableMatchJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse-columnSortableMatch.json');
const browseSchemaColumnSortableMatchxpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse-columnSortableMatch.json');
const browseWithRedirectSchemaJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse-with-redirect.json');
const browseWithRedirectSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse-with-redirect.json');
const browseWithMappersSchemaJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/browse-with-mappers.json');
const browseWithMappersExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse-with-mappers.json');
const editSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit.json');
const editWithActionsSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-actions.json');
const editWithActionsStaticSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-actions-static.json');
const editWithActionsSourceSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-actions-source.json');
const editWithCanCreateExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-canCreate-object.json');
const editWithMinMaxInputSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-min-max-input.json');
const editWithRemoteActionsSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-remote-actions.json');
const editWithRedirectExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-redirect.json');
const newSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/new.json');
const newWithRedirectSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/new-with-redirect.json');
const dashboardSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/dashboard.json');
const dashboardWithSourcesSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/dashboard-with-sources.json');
const dashboardWithLinksSchemaExpectedJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/dashboard-with-links.json');
const previewSchemaExpected = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/preview.json');
const sectionExampleExpected = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/section-example.json');
const settingsExpected = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/settings.json');
const monitorSchemaExpected = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/monitor.json');
const planningSchemaExpected = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/planning.json');

// Load JS view definition schemas
const editSchemaJs = require('./mocks/schemas/edit.js');
const editWithActionsSchemaJs = require('./mocks/schemas/edit-with-actions.js');
const editWithActionsStaticSchemaJs = require('./mocks/schemas/edit-with-actions-static.js');
const editWithActionsSourceSchemaJs = require('./mocks/schemas/edit-with-actions-source.js');
const editWithCanCreateSchemaJs = require('./mocks/schemas/edit-with-canCreate-object.js');
const editWithMinMaxInputSchemaJs = require('./mocks/schemas/edit-with-min-max-input.js');
const editWithRemoteActionsSchemaJs = require('./mocks/schemas/edit-with-remote-actions.js');
const editWithRedirectSchemaJs = require('./mocks/schemas/edit-with-redirect.js');
const newSchemaJs = require('./mocks/schemas/new.js');
const newWithMinMaxInputSchemaJs = require('./mocks/schemas/new-with-min-max-input.js');
const newWithRedirectSchemaJs = require('./mocks/schemas/new-with-redirect.js');
const dashboardSchemaJs = require('./mocks/schemas/dashboard.js');
const dashboardWithSourcesSchemaJs = require('./mocks/schemas/dashboard-with-sources.js');
const dashboardWithLinksSchemaJs = require('./mocks/schemas/dashboard-with-links.js');
const previewSchemaJs = require('./mocks/schemas/preview.js');
const sectionExampleJs = require('./mocks/schemas/section-example.js');
const settingsSchemaJs = require('./mocks/schemas/settings.js');
const monitorSchemaJs = require('./mocks/schemas/monitor.js');
const planningSchemaJs = require('./mocks/schemas/planning.js');

// Helper to deep clone a schema (Validator.execute mutates input)
const clone = obj => JSON.parse(JSON.stringify(obj));

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
		const browseWithCanCreateSchema = JSON.parse(browseWithCanCreateSchemaJson.toString());
		const browseCountDownSchema = JSON.parse(browseSchemaCountDownJson.toString());
		const browseColumnSortableMatchSchema = JSON.parse(browseSchemaColumnSortableMatchJson.toString());
		const browseWithRedirectSchema = JSON.parse(browseWithRedirectSchemaJson.toString());
		const browseWithMappersSchema = JSON.parse(browseWithMappersSchemaJson.toString());
		const editSchema = clone(editSchemaJs);
		const editWithActionsSchema = clone(editWithActionsSchemaJs);
		const editWithActionsStaticSchema = clone(editWithActionsStaticSchemaJs);
		const editWithActionsSourceSchema = clone(editWithActionsSourceSchemaJs);
		const editWithCanCreateSchema = clone(editWithCanCreateSchemaJs);
		const editWithMinMaxInputSchema = clone(editWithMinMaxInputSchemaJs);
		const editWithRemoteActionsSchema = clone(editWithRemoteActionsSchemaJs);
		const editWithRedirectSchema = clone(editWithRedirectSchemaJs);
		const newSchema = clone(newSchemaJs);
		const newWithMinMaxInputSchema = clone(newWithMinMaxInputSchemaJs);
		const newWithRedirectSchema = clone(newWithRedirectSchemaJs);
		const dashboardSchema = clone(dashboardSchemaJs);
		const dashboardWithSourcesSchema = clone(dashboardWithSourcesSchemaJs);
		const dashboardWithLinksSchema = clone(dashboardWithLinksSchemaJs);
		const previewSchema = clone(previewSchemaJs);
		const sectionSchema = clone(sectionExampleJs);
		const settingsSchema = clone(settingsSchemaJs);
		const monitorSchema = clone(monitorSchemaJs);
		const planningSchema = clone(planningSchemaJs);

		const browseData = Validator.execute(browseSchema, true, '/test/data1.json');
		const browseWithCanCreateData = Validator.execute(browseWithCanCreateSchema, true, '/test/data1.json');
		const browseColumnSortableMatchData = Validator.execute(browseColumnSortableMatchSchema, true, '/test/data1.json');
		const editData = Validator.execute(editSchema, true, '/test/data2.json');
		const dashboardData = Validator.execute(dashboardSchema, true, '/test/data3.json');
		const previewData = Validator.execute(previewSchema, true, '/test/data4.json');
		const monitorData = Validator.execute(monitorSchema, true, '/test/data4.json');
		const sectionData = Validator.execute(sectionSchema, true, '/test/data5.json');
		const newData = Validator.execute(newSchema, true, '/test/data6.json');
		const editWithActionsData = Validator.execute(editWithActionsSchema, true, '/test/data7.json');
		const editWithActionsStaticData = Validator.execute(editWithActionsStaticSchema, true, '/test/data8.json');
		const editWithActionsSourceData = Validator.execute(editWithActionsSourceSchema, true, '/test/data9.json');
		const editWithRemoteActionsData = Validator.execute(editWithRemoteActionsSchema, true, '/test/data10.json');
		const editWithMinMaxInputData = Validator.execute(editWithMinMaxInputSchema, true, '/test/data11.json');
		const newWithMinMaxInputData = Validator.execute(newWithMinMaxInputSchema, true, '/test/data12.json');
		const editWithCanCreateData = Validator.execute(editWithCanCreateSchema, true, '/test/data13.json');
		const editWithRedirectData = Validator.execute(editWithRedirectSchema, true, '/test/data14.json');
		const browseWithRedirectMatchData = Validator.execute(browseWithRedirectSchema, true, '/test/data15.json');
		const newWithRedirectData = Validator.execute(newWithRedirectSchema, true, '/test/data16.json');
		const browseCountDownData = Validator.execute(browseCountDownSchema, true, '/test/data17.json');
		const planningData = Validator.execute(planningSchema, true, '/test/data17.json');
		const settingsData = Validator.execute(settingsSchema, true, '/test/data18.json');
		const dashboardWithSourcesData = Validator.execute(dashboardWithSourcesSchema, true, '/test/data19.json');
		const dashboardWithLinksData = Validator.execute(dashboardWithLinksSchema, true, '/test/data20.json');
		const browseWithMappersData = Validator.execute(browseWithMappersSchema, true, '/test/data21.json');

		sinon.assert.match(browseData, JSON.parse(browseSchemaExpectedJson.toString()));
		sinon.assert.match(browseWithCanCreateData, JSON.parse(browseWithCanCreateSchemaExpectedJson.toString()));
		sinon.assert.match(browseCountDownData, JSON.parse(browseSchemaCountDownExpectedJson.toString()));
		sinon.assert.match(browseColumnSortableMatchData, JSON.parse(browseSchemaColumnSortableMatchxpectedJson.toString()));
		sinon.assert.match(browseWithRedirectMatchData, JSON.parse(browseWithRedirectSchemaExpectedJson.toString()));
		sinon.assert.match(browseWithMappersData, JSON.parse(browseWithMappersExpectedJson.toString()));
		sinon.assert.match(editData, JSON.parse(editSchemaExpectedJson.toString()));
		sinon.assert.match(editWithActionsData, JSON.parse(editWithActionsSchemaExpectedJson.toString()));
		sinon.assert.match(editWithActionsStaticData, JSON.parse(editWithActionsStaticSchemaExpectedJson.toString()));
		sinon.assert.match(editWithActionsSourceData, JSON.parse(editWithActionsSourceSchemaExpectedJson.toString()));
		sinon.assert.match(editWithCanCreateData, JSON.parse(editWithCanCreateExpectedJson.toString()));
		sinon.assert.match(editWithMinMaxInputData, JSON.parse(editWithMinMaxInputSchemaExpectedJson.toString()));
		sinon.assert.match(editWithRemoteActionsData, JSON.parse(editWithRemoteActionsSchemaExpectedJson.toString()));
		sinon.assert.match(editWithRedirectData, JSON.parse(editWithRedirectExpectedJson.toString()));
		sinon.assert.match(newData, JSON.parse(newSchemaExpectedJson.toString()));
		sinon.assert.match(newWithMinMaxInputData, JSON.parse(newSchemaExpectedJson.toString()));
		sinon.assert.match(newWithRedirectData, JSON.parse(newWithRedirectSchemaExpectedJson.toString()));
		sinon.assert.match(dashboardData, JSON.parse(dashboardSchemaExpectedJson.toString()));
		sinon.assert.match(dashboardWithSourcesData, JSON.parse(dashboardWithSourcesSchemaExpectedJson.toString()));
		sinon.assert.match(dashboardWithLinksData, JSON.parse(dashboardWithLinksSchemaExpectedJson.toString()));
		sinon.assert.match(previewData, JSON.parse(previewSchemaExpected.toString()));
		sinon.assert.match(sectionData, JSON.parse(sectionExampleExpected.toString()));
		sinon.assert.match(settingsData, JSON.parse(settingsExpected.toString()));
		sinon.assert.match(monitorData, JSON.parse(monitorSchemaExpected.toString()));
		sinon.assert.match(planningData, JSON.parse(planningSchemaExpected.toString()));
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
