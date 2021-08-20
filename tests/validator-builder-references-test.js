'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const mock = require('mock-fs');
const Validator = require('../lib/validator');
const ViewSchemaValidator = require('./../lib');

// Schemas examples
const editSchemaExampleYML = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit-with-refs.yml');
const editWithRefsExpected = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-refs-resolved.json');
// Schema partials
const fieldPartialJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/partials/fields/idText.partial.json');
const sectionPartialYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/partials/sections/browse.partial.yml');


const executeInstance = schemasFolder => {
	const schemaValidator = new ViewSchemaValidator(
		'/tests/schemas/fakeFolder',
		'/tests/schemas/fakeBuildFolder',
		undefined,
		false,
		schemasFolder || 'tests/mocks/schemas/partials',
		false,
		'validate',
		'local'
	);

	return schemaValidator.execute.bind(schemaValidator);
};

const editSchemaExampleStringified = editSchemaExampleYML.toString();

const mockfs = items => {
	mock({
		'tests/schemas/fakeFolder': mock.directory({
			items: items || { 'edit.yml': mock.file({ content: editSchemaExampleStringified }) }
		}),
		'tests/mocks/schemas/partials/fields': mock.directory({
			items: { 'idText.partial.json': mock.file({ content: fieldPartialJson.toString() }) }
		}),
		'tests/mocks/schemas/partials/sections': mock.directory({
			items: { 'browse.partial.yml': mock.file({ content: sectionPartialYml.toString() }) }
		})
	}, { createCwd: true, createTmp: false });
};

describe('test builder with refs', () => {

	afterEach(() => {
		sinon.restore();
		mock.restore();
	});

	beforeEach(() => {
		sinon.stub(fs, 'readdir').returns([{ name: 'edit.yml', isFile: () => true }]);
	});

	it('should error if not exist reference file path', async () => {
		sinon.stub(process, 'exit');

		const spyValidator = sinon.spy(Validator, 'execute');

		mockfs({
			'edit.yml': mock.file({
				content: editSchemaExampleStringified.replace('browse.partial.yml', 'browseTest.partial.yml')
			})
		});

		const execute = executeInstance();

		await assert.rejects(async () => { await execute(); });

		assert(spyValidator.notCalled);
	});

	it('should return expected schema resolved', async () => {
		sinon.stub(process, 'exit');

		const stubValidator = sinon.stub(Validator, 'execute');

		mockfs();

		const execute = executeInstance();

		await execute();

		sinon.assert.calledWithMatch(stubValidator, JSON.parse(editWithRefsExpected.toString()));
	});

	it('should return expected schema resolved with paths modified', async () => {
		sinon.stub(process, 'exit');

		const stubValidator = sinon.stub(Validator, 'execute');

		mockfs({
			'edit.yml': mock.file({
				content: editSchemaExampleStringified.replace('sections/browse.partial.yml', '/sections/browse.partial.yml')
			})
		});

		const execute = executeInstance('tests/mocks/schemas/partials/');

		await execute();

		sinon.assert.calledWithMatch(stubValidator, JSON.parse(editWithRefsExpected.toString()));
	});
});
