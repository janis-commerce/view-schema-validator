'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const schemaModifier = require('../lib/custom-schema-validator');

const editSchemaCompiled = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit.json');
const browseSchemaCompiled = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse.json');

describe('custom-schema-validator', () => {
	beforeEach(() => {
		sinon.restore();
	});

	it('should pass validation if exist source prop and MainForm Section', async () => {
		const validateMainFormSourceSpy = sinon.spy(schemaModifier, 'validateMainFormSource');

		const schemaOne = JSON.parse(editSchemaCompiled.toString());

		const dataOne = schemaModifier.execute(schemaOne);

		assert(validateMainFormSourceSpy.calledOnce);

		assert.deepEqual(dataOne, schemaOne);
	});

	it('should pass validation if not is a Edit Schema', async () => {
		const validateMainFormSourceSpy = sinon.spy(schemaModifier, 'validateMainFormSource');

		const schemaOne = JSON.parse(browseSchemaCompiled.toString());

		const dataOne = schemaModifier.execute(schemaOne);

		assert(validateMainFormSourceSpy.notCalled);

		assert.deepEqual(dataOne, schemaOne);
	});

	it('should return an error if not exist source prop and exist MainForm section', async () => {
		const validateMainFormSourceSpy = sinon.spy(schemaModifier, 'validateMainFormSource');

		const schemaOne = JSON.parse(editSchemaCompiled.toString());

		delete schemaOne.source;

		const message = 'Edit Schema requires ´source´ property because MainForm Section exists';

		assert.throws(() => schemaModifier.execute(schemaOne), { message });
		assert(validateMainFormSourceSpy.calledOnce);
	});

	it('should pass validation if not exist source prop and not exist MainForm section', async () => {
		const validateMainFormSourceSpy = sinon.spy(schemaModifier, 'validateMainFormSource');

		const schemaOne = JSON.parse(editSchemaCompiled.toString());

		delete schemaOne.source;

		schemaOne.sections = schemaOne.sections.filter(section => section.rootComponent !== 'MainForm');

		const dataOne = schemaModifier.execute(schemaOne);

		assert(validateMainFormSourceSpy.calledOnce);
		assert.deepEqual(dataOne, schemaOne);
	});

});
