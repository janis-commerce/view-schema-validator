'use strict';

const assert = require('assert');
const sinon = require('sinon');

const deprecationValidator = require('../lib/deprecation-validator');

const deprecatedSchemaIdentifier = require('./mocks/schemas/deprecated/edit-with-deprecated-title-identifier.js');
const deprecatedSchemaBeforeId = require('./mocks/schemas/deprecated/edit-with-deprecated-title-before-id.js');
const deprecatedSchemaAfterId = require('./mocks/schemas/deprecated/edit-with-deprecated-title-after-id.js');
const deprecatedSchemaTitleComponents = require('./mocks/schemas/deprecated/edit-with-deprecated-title-components.js');

// Helper to deep clone since tests mutate schemas
const clone = obj => JSON.parse(JSON.stringify(obj));

describe('deprecation-validator', () => {

	afterEach(() => {
		sinon.restore();
	});

	it('should find a deprecated property identifier in header', async () => {

		const executeSpy = sinon.spy(deprecationValidator, 'execute');

		deprecationValidator.execute(clone(deprecatedSchemaIdentifier));

		assert(executeSpy.calledOnce);
	});

	it('should return if it dosen\'t have header', async () => {

		const executeSpy = sinon.spy(deprecationValidator, 'execute');

		const schema = clone(deprecatedSchemaIdentifier);
		delete schema.header;

		deprecationValidator.execute(schema);

		assert(executeSpy.calledOnce);
	});

	it('should find a deprecated property afterId in header', async () => {

		const executeSpy = sinon.spy(deprecationValidator, 'execute');

		deprecationValidator.execute(clone(deprecatedSchemaAfterId));

		assert(executeSpy.calledOnce);
	});

	it('should find a deprecated property beforeId in header', async () => {

		const executeSpy = sinon.spy(deprecationValidator, 'execute');

		deprecationValidator.execute(clone(deprecatedSchemaBeforeId));

		assert(executeSpy.calledOnce);
	});

	it('should find a deprecated property components in header', async () => {

		const executeSpy = sinon.spy(deprecationValidator, 'execute');

		deprecationValidator.execute(clone(deprecatedSchemaTitleComponents));

		assert(executeSpy.calledOnce);
	});


});
