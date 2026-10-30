'use strict';

const assert = require('assert');
const fs = require('fs-extra');
const ymljs = require('yamljs');

const Validator = require('../lib/validator');

const editYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit-with-lineBreak.yml').toString();
const previewYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/preview.yml').toString();

const coreLogsSection = {
	name: 'coreLogs',
	icon: 'clock',
	rootComponent: 'CoreLogsBrowseSection',
	conditions: {
		showWhen: [[{ name: 'isDev' }]]
	}
};

describe('CoreLogsBrowseSection', () => {

	const buildSchema = (yml, section) => {
		const schema = ymljs.parse(yml);
		schema.sections.push(section);
		return schema;
	};

	it('Should validate in an Edit schema', () => {
		const schema = buildSchema(editYml, coreLogsSection);
		const data = Validator.execute(schema, true, '/test/core-logs-edit.json');
		assert.deepStrictEqual(data.sections[data.sections.length - 1], coreLogsSection);
	});

	it('Should fail in an Edit schema with a not allowed property', () => {
		const schema = buildSchema(editYml, { ...coreLogsSection, source: { service: 'trace' } });
		assert.throws(() => Validator.execute(schema, true, '/test/core-logs-edit-extra.json'));
	});

	it('Should fail in a Preview schema', () => {
		const schema = buildSchema(previewYml, coreLogsSection);
		assert.throws(() => Validator.execute(schema, true, '/test/core-logs-preview.json'));
	});

});
