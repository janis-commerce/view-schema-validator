'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const Validator = require('../lib/validator');
const ViewSchemaValidator = require('./../lib');

// Load JS schemas with imports (references resolved via require())
const editWithRefsSchema = require('./mocks/schemas/edit-with-refs.js');

const editWithRefsExpected = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-refs-resolved.json');

describe('test builder with JS imports (replacing $ref)', () => {

	afterEach(() => {
		sinon.restore();
	});

	it('should resolve JS imports correctly', () => {
		// JS imports are resolved at require() time, producing the same result as $ref resolution
		const expected = JSON.parse(editWithRefsExpected.toString());
		sinon.assert.match(editWithRefsSchema, expected);
	});

	it('should validate schema with resolved imports', () => {
		const stubValidator = sinon.spy(Validator, 'execute');

		// Deep clone since Validator.execute mutates the schema
		const schema = JSON.parse(JSON.stringify(editWithRefsSchema));

		Validator.execute(schema, true, '/test/edit-with-refs.js');

		assert(stubValidator.calledOnce);
	});

	it('should validate a single JS file through the builder', async () => {
		sinon.stub(fs, 'writeFile');
		sinon.stub(fs, 'emptyDir');

		const stubValidator = sinon.stub(Validator, 'execute');

		const schemaValidator = new ViewSchemaValidator(
			'/tests/mocks/schemas/edit-with-refs.js',
			'/tests/schemas/fakeBuildFolder',
			undefined,
			false,
			false,
			'validate',
			'local'
		);

		const execute = schemaValidator.execute.bind(schemaValidator);
		await execute();

		const expected = JSON.parse(editWithRefsExpected.toString());
		sinon.assert.calledWithMatch(stubValidator, expected);
	});
});
