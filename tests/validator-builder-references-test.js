'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const mock = require('mock-fs');
const Builder = require('../lib/builder');
const Validator = require('../lib/validator');
const ViewSchemaValidator = require('./../lib');

const fieldPartialJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/partials/fields/idText.partial.json');
const sectionPartialYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/partials/sections/browse.partial.yml');

const editSchemaExampleYML = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit-with-refs.yml');
const editWithRefsExpected = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-refs-resolved.json');


const executeInstance = (build = true, file, minified = false) => {
	const schemaValidator = new ViewSchemaValidator(
		`/tests/schemas/fakeFolder/${file || ''}`,
		'/tests/schemas/fakeBuildFolder',
		undefined,
		minified,
		'tests/mocks/schemas/partials',
		false,
		build ? 'build' : 'validate',
		'local'
	);

	return schemaValidator.execute.bind(schemaValidator);
};

const mockfs = items => {
	mock({
		'tests/schemas/fakeFolder': mock.directory({
			items: items || { 'edit.yml': mock.file({ content: editSchemaExampleYML.toString() }) }
		}),

		'tests/mocks/schemas/partials/fields': mock.directory({
			items: {
				'idText.partial.json': mock.file({ content: fieldPartialJson.toString() })
			}
		}),
		'tests/mocks/schemas/partials/sections': mock.directory({
			items: {
				'browse.partial.yml': mock.file({ content: sectionPartialYml.toString() })
			}
		})
	}, { createCwd: true, createTmp: false });
};

describe('test builder single files', () => {

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
		const processOutputSpy = sinon.spy(Builder.prototype, 'processOutput');

		mockfs({
			'edit.yml': mock.file({
				content: editSchemaExampleYML.toString().replace('browse.partial.yml', 'browseTest.partial.yml')
			})
		});

		const execute = executeInstance();

		await assert.rejects(async () => { await execute(); });

		assert(spyValidator.notCalled);
		assert(processOutputSpy.notCalled);
	});

	it('should return expected schema resolved', async () => {
		sinon.stub(process, 'exit');

		const stubValidator = sinon.stub(Validator, 'execute');
		const processOutputSpy = sinon.spy(Builder.prototype, 'processOutput');

		mockfs();

		const execute = executeInstance(false);

		await execute();

		sinon.assert.calledWithMatch(stubValidator, JSON.parse(editWithRefsExpected.toString()));

		assert(processOutputSpy.notCalled);
	});
});
