'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const ymljs = require('yamljs');

const deprecationValidator = require('../lib/deprecation-validator');

const titleIdentifier = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/deprecated/edit-with-deprecated-title-identifier.yml');
const titleBeforeId = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/deprecated/edit-with-deprecated-title-before-id.yml');
const titleAfterId = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/deprecated/edit-with-deprecated-title-after-id.yml');
const titleComponents = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/deprecated/edit-with-deprecated-title-components.yml');
const staticFilters = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/deprecated/edit-with-deprecated-static-filters.yml');

const deprecatedSchemaIdentifier = ymljs.parse(titleIdentifier.toString());
const deprecatedSchemaBeforeId = ymljs.parse(titleBeforeId.toString());
const deprecatedSchemaAfterId = ymljs.parse(titleAfterId.toString());
const deprecatedSchemaTitleComponents = ymljs.parse(titleComponents.toString());
const deprecatedSchemaStaticFilters = ymljs.parse(staticFilters.toString());

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

	it('should find a deprecated property components in header', async () => {

		const executeSpy = sinon.spy(deprecationValidator, 'execute');

		deprecationValidator.execute(deprecatedSchemaTitleComponents);

		assert(executeSpy.calledOnce);
	});

	it('should find a deprecated property staticFilters', async () => {

		const executeSpy = sinon.spy(deprecationValidator, 'execute');

		deprecationValidator.execute(deprecatedSchemaStaticFilters);

		assert(executeSpy.calledOnce);
	});

});
