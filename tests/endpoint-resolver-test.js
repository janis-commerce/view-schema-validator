/* 'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const ymljs = require('yamljs');
const Validator = require('../lib/validator');
const EndpointResolver = require('../lib/endpoint-resolver');


const schemaExampleYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit-with-sources.yml');
const schemaExpectedExample = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-sources.json');

const sandbox = sinon.createSandbox();

describe.only('Test endpoint resolver', () => {
	beforeEach(() => {
		sandbox.restore();
	});

	// your tests here...
	it('Should error if pass schema with root not defined', () => {
		const schema = ymljs.parse(schemaExampleYml.toString());
		const schemaValidated = Validator.execute(schema, true, '/test/data.json');

		const endpointResolver = new EndpointResolver('sac');
		endpointResolver.execute.bind(this.endpointResolver);

		console.log(schemaValidated);
	});


	it('should pass validation and build data with default schema', () => {
		const validateSpy = sandbox.spy(Validator, 'validate');
		const compileSpy = sandbox.spy(Validator, 'compile');

		const schema = { root: 'Terminal', url: 'http://janis.in' };

		Validator.execute(schema, true, '/test/data.json');

		assert(validateSpy.calledOnce);
		assert(compileSpy.calledOnce);
	});

});
 */
