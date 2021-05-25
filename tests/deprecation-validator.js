'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const ymljs = require('yamljs');

const deprecationValidator = require('../lib/deprecation-validator');

const titleIdentifier = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/deprecated/edit-with-deprecated-title-identifier.yml');
const titleBeforeId = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/deprecated/edit-with-deprecated-title-before-id.yml');
const titleAfterId = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/deprecated/edit-with-deprecated-title-after-id.yml');
const statiFilters = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/deprecated/edit-with-deprecated-static-filters.yml');

const deprecatedSchemaIdentifier = ymljs.parse(titleIdentifier.toString());
const deprecatedSchemaBeforeId = ymljs.parse(titleBeforeId.toString());
const deprecatedSchemaAfterId = ymljs.parse(titleAfterId.toString());
const deprecatedSchemaStataicFilters = ymljs.parse(statiFilters.toString());

describe('deprecation-validator', () => {

	afterEach(() => {
		sinon.restore();
	});

	it('should find a deprecated property identifier in header', async () => {

		const executeSpy = sinon.spy(deprecationValidator, 'execute');

		deprecationValidator.execute(deprecatedSchemaIdentifier);

		assert(executeSpy.calledOnce);
	});

	it('should return if it dosen\'t have header', async () => {

		const executeSpy = sinon.spy(deprecationValidator, 'execute');

		delete deprecatedSchemaIdentifier.header;

		deprecationValidator.execute(deprecatedSchemaIdentifier);

		assert(executeSpy.calledOnce);
	});

	it('should find a deprecated property afterId in header', async () => {

		const executeSpy = sinon.spy(deprecationValidator, 'execute');

		deprecationValidator.execute(deprecatedSchemaAfterId);

		assert(executeSpy.calledOnce);
	});

	it('should find a deprecated property beforeId in header', async () => {

		const executeSpy = sinon.spy(deprecationValidator, 'execute');

		deprecationValidator.execute(deprecatedSchemaBeforeId);

		assert(executeSpy.calledOnce);
	});

	it('should find a deprecated property statiFilters', async () => {

		const executeSpy = sinon.spy(deprecationValidator, 'execute');

		deprecationValidator.execute(deprecatedSchemaStataicFilters);

		assert(executeSpy.calledOnce);
	});

});
