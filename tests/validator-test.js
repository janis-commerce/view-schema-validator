'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const ymljs = require('yamljs');
const Validator = require('../lib/validator');

const SCHEMAS_BASE_PATH = `${process.cwd()}/tests/mocks/schemas`;
const DEFAULT_DATA_PATH = '/test/data.json';
const MAX_DIFFS_PER_SCHEMA = 20;
const MAX_SCHEMA_REPORTS = 20;
const TRUNCATE_LENGTH = 120;

const ERROR_ROOT_NOT_DEFINED = 'root or rootComponent property not defined in';

/** Reads the schema from the input directory.
 * @param {string} relativePath - The path to the schema file.
 * @returns {Buffer} The schema file.
 */
const readSchema = relativePath => fs.readFileSync(`${SCHEMAS_BASE_PATH}/${relativePath}`);

/** Loads the JSON schema from the input directory.
 * @param {string} relativePath - The path to the JSON schema file.
 * @returns {object} The JSON schema.
 */
const loadJsonSchema = relativePath => JSON.parse(readSchema(relativePath).toString());

/** Loads the YAML schema from the input directory.
 * @param {string} relativePath - The path to the YAML schema file.
 * @returns {object} The YAML schema.
 */
const loadYamlSchema = relativePath => ymljs.parse(readSchema(relativePath).toString());

/** Loads the input schema from the input directory.
 * @param {object} schema - The schema object.
 * @returns {object} The input schema.
 */
const loadInputSchema = ({ path, type }) => (type === 'yml' ? loadYamlSchema(path) : loadJsonSchema(path));

/** Loads the expected schema from the expected directory.
 * @param {string} expectedPath - The path to the expected schema file.
 * @returns {object} The expected schema.
 */
const loadExpectedSchema = expectedPath => loadJsonSchema(`expected/${expectedPath}`);


/** Generates deterministic dataPath from schema path (no hardcoded paths)
 * @param {string} schemaPath - The path to the schema file.
 * @returns {string} The deterministic dataPath.
*/
const getDataPathForSchema = schemaPath => `/test/schemas/${schemaPath.replace(/\.(json|yml)$/, '')}.json`;

// --- Spy helpers ---

const createValidateCompileSpies = () => ({
	validateSpy: sinon.spy(Validator, 'validate'),
	compileSpy: sinon.spy(Validator, 'compile')
});

const assertSpiesValidateOnly = (validateSpy, compileSpy) => {
	assert(validateSpy.calledOnce);
	assert(compileSpy.notCalled);
};

const assertSpiesValidateAndCompile = (validateSpy, compileSpy) => {
	assert(validateSpy.calledOnce);
	assert(compileSpy.calledOnce);
};

/** Checks if the value is an object.
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is an object, false otherwise.
 */
const isObject = value => value && typeof value === 'object' && !Array.isArray(value);

/** Truncates the value for error messages.
 * @param {any} value - The value to truncate.
 * @param {number} maxLength - The maximum length of the value.
 * @returns {string} The truncated value.
 */
const truncateForError = (value, maxLength = TRUNCATE_LENGTH) => {
	let serialized;
	try {
		serialized = JSON.stringify(value);
	} catch(err) {
		serialized = String(value);
	}
	if(typeof serialized !== 'string')
		serialized = String(value);
	return serialized.length > maxLength ? `${serialized.slice(0, maxLength)}...` : serialized;
};

/** Finds the differences between the current value and the expected value.
 * @param {any} currentValue - The current value.
 * @param {any} expectedValue - The expected value.
 * @param {string} currentPath - The current path.
 * @param {array} diffs - The differences.
 * @returns {array} The differences.
 */
const findDiffs = (currentValue, expectedValue, currentPath = 'root', diffs = []) => {
	if(diffs.length >= MAX_DIFFS_PER_SCHEMA)
		return diffs;

	if(Object.is(currentValue, expectedValue))
		return diffs;

	if(Array.isArray(currentValue) && Array.isArray(expectedValue)) {
		if(currentValue.length < expectedValue.length) {
			diffs.push({
				path: `${currentPath}.length`,
				expected: `>= ${expectedValue.length}`,
				received: currentValue.length
			});
			return diffs;
		}
		expectedValue.some((_, index) => {
			findDiffs(currentValue[index], expectedValue[index], `${currentPath}[${index}]`, diffs);
			return diffs.length >= MAX_DIFFS_PER_SCHEMA;
		});
		return diffs;
	}

	if(isObject(currentValue) && isObject(expectedValue)) {
		const expectedKeys = Object.keys(expectedValue).sort();

		expectedKeys.some(key => {
			findDiffs(currentValue[key], expectedValue[key], `${currentPath}.${key}`, diffs);
			return diffs.length >= MAX_DIFFS_PER_SCHEMA;
		});

		return diffs;
	}

	diffs.push({
		path: currentPath,
		expected: expectedValue,
		received: currentValue
	});
	return diffs;
};

/** Formats the difference line for the error message.
 * @param {object} diff - The difference.
 * @param {number} index - The index of the difference.
 * @returns {string} The formatted difference line.
 */
const formatDiffLine = (diff, index) => (
	`${index + 1}) ${diff.path} | expected: ${truncateForError(diff.expected)} ` +
	`| received: ${truncateForError(diff.received)}`
);

/** Formats the schema difference report.
 * @param {object} schemaCase - The schema case.
 * @param {array} diffs - The differences.
 * @returns {string} The formatted schema difference report.
 */
const formatSchemaDiffReport = (schemaCase, diffs) => {
	const diffMessages = diffs.map(formatDiffLine).join('\n');
	const truncationNote = diffs.length >= MAX_DIFFS_PER_SCHEMA
		? '\n... (diffs adicionales truncados)'
		: '';
	return `Schema mismatch (RECEIVED:${schemaCase.schema.path} -> EXPECTED: ${schemaCase.expected})\n${diffMessages}${truncationNote}`;
};

/** Formats the schema execution error report.
 * @param {object} schemaCase - The schema case.
 * @param {object} error - The error.
 * @returns {string} The formatted schema execution error report.
 */
const formatSchemaExecutionErrorReport = (schemaCase, error) => {
	const validationLines = Array.isArray(error && error.errors)
		? error.errors.slice(0, MAX_DIFFS_PER_SCHEMA).map(line => `${line}\n`)
		: '';
	const validationTruncationNote = Array.isArray(error && error.errors) && error.errors.length > MAX_DIFFS_PER_SCHEMA
		? '\n... (errores de validacion truncados)'
		: '';

	return (
		`[SCHEMA CASE] ${schemaCase.schema.path} -> ${schemaCase.expected}\n` +
		`Error message: ${(error && error.message) || 'Unknown execution error'}` +
		(validationLines ? `\nvalidation errors:\n${validationLines}${validationTruncationNote}` : '')
	);
};

/** Runs the compilation and collects the differences.
 * @param {array} schemaCases - The schema cases.
 * @returns {array} The schema reports.
 */
const runCompilationAndCollectDiffs = schemaCases => {
	const schemaReports = [];

	schemaCases.some(schemaCase => {
		if(schemaReports.length >= MAX_SCHEMA_REPORTS)
			return true;

		const dataPath = getDataPathForSchema(schemaCase.schema.path);
		const inputSchema = loadInputSchema(schemaCase.schema);
		const expectedSchema = loadExpectedSchema(schemaCase.expected);

		try {
			const compiledSchema = Validator.execute(inputSchema, true, dataPath);
			const diffs = findDiffs(compiledSchema, expectedSchema);

			if(diffs.length)
				schemaReports.push(formatSchemaDiffReport(schemaCase, diffs));
		} catch(error) {
			schemaReports.push(formatSchemaExecutionErrorReport(schemaCase, error));
		}

		return false;
	});

	return schemaReports;
};

const SCHEMA_COMPILATION_SCHEMAS = [
	{ schema: { path: 'browse.json', type: 'json' }, expected: 'browse.json' },
	{ schema: { path: 'browse-with-can-create.json', type: 'json' }, expected: 'browse-with-can-create.json' },
	{ schema: { path: 'browse-columnSortableMatch.json', type: 'json' }, expected: 'browse-columnSortableMatch.json' },
	{ schema: { path: 'edit.yml', type: 'yml' }, expected: 'edit.json' },
	{ schema: { path: 'dashboard.yml', type: 'yml' }, expected: 'dashboard.json' },
	{ schema: { path: 'preview.yml', type: 'yml' }, expected: 'preview.json' },
	{ schema: { path: 'monitor.yml', type: 'yml' }, expected: 'monitor.json' },
	{ schema: { path: 'section-example.yml', type: 'yml' }, expected: 'section-example.json' },
	{ schema: { path: 'new.yml', type: 'yml' }, expected: 'new.json' },
	{ schema: { path: 'edit-with-actions.yml', type: 'yml' }, expected: 'edit-with-actions.json' },
	{ schema: { path: 'edit-with-actions-static.yml', type: 'yml' }, expected: 'edit-with-actions-static.json' },
	{ schema: { path: 'edit-with-actions-source.yml', type: 'yml' }, expected: 'edit-with-actions-source.json' },
	{ schema: { path: 'edit-with-remote-actions.yml', type: 'yml' }, expected: 'edit-with-remote-actions.json' },
	{ schema: { path: 'edit-with-min-max-input.yml', type: 'yml' }, expected: 'edit-with-min-max-input.json' },
	{ schema: { path: 'new-with-min-max-input.yml', type: 'yml' }, expected: 'new.json' },
	{ schema: { path: 'edit-with-canCreate-object.yml', type: 'yml' }, expected: 'edit-with-canCreate-object.json' },
	{ schema: { path: 'edit-with-redirect.yml', type: 'yml' }, expected: 'edit-with-redirect.json' },
	{ schema: { path: 'browse-with-redirect.json', type: 'json' }, expected: 'browse-with-redirect.json' },
	{ schema: { path: 'new-with-redirect.yml', type: 'yml' }, expected: 'new-with-redirect.json' },
	{ schema: { path: 'browse-countDown.json', type: 'json' }, expected: 'browse-countDown.json' },
	{ schema: { path: 'planning.yml', type: 'yml' }, expected: 'planning.json' },
	{ schema: { path: 'settings.yml', type: 'yml' }, expected: 'settings.json' },
	{ schema: { path: 'dashboard-with-sources.yml', type: 'yml' }, expected: 'dashboard-with-sources.json' },
	{ schema: { path: 'dashboard-with-links.yml', type: 'yml' }, expected: 'dashboard-with-links.json' },
	{ schema: { path: 'browse-with-mappers.json', type: 'json' }, expected: 'browse-with-mappers.json' }
];

describe('Validator', () => {

	beforeEach(() => {
		sinon.restore();
	});

	describe('root / rootComponent validation', () => {

		it('throws when schema has neither root nor rootComponent', () => {
			const schema = loadJsonSchema('browse.json');
			delete schema.root;

			assert.throws(
				() => Validator.execute(schema, true, DEFAULT_DATA_PATH),
				{ message: `${ERROR_ROOT_NOT_DEFINED} ${DEFAULT_DATA_PATH}` }
			);
		});

		it('throws when schema has invalid root type', () => {
			const schema = { root: 5, url: 'http://janis.in' };

			assert.throws(
				() => Validator.execute(schema, true, DEFAULT_DATA_PATH)
			);
		});

		it('throws when schema has no root and no url', () => {
			const schema = { url: 'http://janis.in' };

			assert.throws(
				() => Validator.execute(schema, true, DEFAULT_DATA_PATH)
			);
		});
	});

	describe('validate / compile spies', () => {

		it('calls validate only when compile=false', () => {
			const schema = { root: 'Terminal', url: 'http://janis.in' };
			const { validateSpy, compileSpy } = createValidateCompileSpies();

			const result = Validator.execute(schema, false, DEFAULT_DATA_PATH);

			assertSpiesValidateOnly(validateSpy, compileSpy);
			assert(result === undefined);
		});

		it('calls validate and compile when compile=true', () => {
			const schema = { root: 'Terminal', url: 'http://janis.in' };
			const { validateSpy, compileSpy } = createValidateCompileSpies();

			Validator.execute(schema, true, DEFAULT_DATA_PATH);

			assertSpiesValidateAndCompile(validateSpy, compileSpy);
		});

		it('does not call compile when validation fails', () => {
			const schema = loadJsonSchema('browse.json');
			delete schema.name;
			const { validateSpy, compileSpy } = createValidateCompileSpies();

			assert.throws(() => Validator.execute(schema, true, DEFAULT_DATA_PATH));

			assertSpiesValidateOnly(validateSpy, compileSpy);
		});
	});

	describe('schema compilation vs expected', () => {

		it('compiled output matches expected for all schemas', () => {
			const reports = runCompilationAndCollectDiffs(SCHEMA_COMPILATION_SCHEMAS);

			if(reports.length)
				assert.fail(`Found fixture mismatches in ${reports.length} file(s)\n\n${reports.join('\n\n')}`);
		});
	});

	describe('validation errors', () => {

		it('throws when schema has validation errors', () => {
			const schema = loadJsonSchema('browse.json');
			delete schema.name;

			assert.throws(
				() => Validator.execute(schema, true, DEFAULT_DATA_PATH)
			);
		});

		it('returns compact validation errors (array of strings, no internal schema leakage)', () => {
			const schema = loadJsonSchema('browse.json');
			delete schema.name;

			try {
				Validator.execute(schema, true, DEFAULT_DATA_PATH);
				assert.fail('Expected validation error');
			} catch(error) {
				assert(Array.isArray(error.errors));
				assert(error.errors.length > 0);
				assert(error.errors.every(e => typeof e === 'string'));
				assert(error.errors.every(e => !e.includes('parentSchema')));
				assert(error.errors.every(e => !e.includes('"properties"')));
			}
		});


	});

	describe('default schema', () => {

		it('passes validation and compiles with valid default schema', () => {
			const schema = { root: 'Terminal', url: 'http://janis.in' };
			const { validateSpy, compileSpy } = createValidateCompileSpies();

			Validator.execute(schema, true, DEFAULT_DATA_PATH);

			assertSpiesValidateAndCompile(validateSpy, compileSpy);
		});
	});
});
