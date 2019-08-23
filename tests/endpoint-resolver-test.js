'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const ymljs = require('yamljs');
const RouterFetcher = require('@janiscommerce/router-fetcher');
const EndpointResolverLocal = require('@janiscommerce/endpoint-resolver');
const Validator = require('../lib/validator');
const EndpointResolver = require('../lib/endpoint-resolver');

const schemaExampleYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit-with-sources.yml');
const schemaExpectedExample = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-sources.json');

const sandbox = sinon.createSandbox();

const mockRequest = (rejectOne = false) => {
	const getEndpointStub = sandbox.stub(RouterFetcher.prototype, 'getEndpoint');
	const resolveStub = sandbox.stub(EndpointResolverLocal.prototype, 'resolve');

	if(rejectOne) {
		getEndpointStub
			.withArgs('id', 'admin', 'list')
			.rejects();
	} else {
		getEndpointStub
			.withArgs('id', 'admin', 'list')
			.returns({
				httpMethod: 'get',
				url: 'http://id.janis.localhost:3019/api/admins'
			});
	}

	resolveStub
		.withArgs('claim-motive', 'list')
		.returns({
			httpMethod: 'get',
			url: 'http://sac.janis.localhost:3009/api/claim-motives'
		});

	resolveStub
		.withArgs('claim-compensation', 'list')
		.returns({
			httpMethod: 'get',
			url: 'http://sac.janis.localhost:3009/api/claim-compensations'
		});
};

const validateSchema = async (twice = false) => {
	const schema = ymljs.parse(schemaExampleYml.toString());
	const schemaValidated = Validator.execute(schema, true, '/test/data.json');

	const endpointResolver = new EndpointResolver('sac');
	endpointResolver.execute.bind(endpointResolver);

	const schemaResolved = await endpointResolver.execute(schemaValidated);

	if(twice)
		await endpointResolver.execute(schemaValidated);

	return schemaResolved;
};

describe('Test endpoint resolver', () => {
	beforeEach(() => {
		sandbox.restore();
	});

	// your tests here...
	it('Should pass validation in resolve endpoints', async () => {
		mockRequest();

		const resolveEndpointsSpy = sandbox.spy(EndpointResolver.prototype, 'resolveEndpoints');
		const addResolveDataToEndpointsSpy = sandbox.spy(EndpointResolver.prototype, 'addResolveDataToEndpoints');

		const schemaResolved = await validateSchema();

		assert(resolveEndpointsSpy.calledOnce);
		assert(addResolveDataToEndpointsSpy.calledOnce);
		assert.deepEqual(JSON.stringify(schemaResolved, null, 4), schemaExpectedExample.toString());
	});


	it('should error if fail some request', async () => {
		mockRequest(true);

		await assert.rejects(async () => { await validateSchema(); }, {
			message: 'Fail call routerFetcher for {"service":"id","namespace":"admin","method":"list"}'
		});
	});


	it('should resolve uniq sources', async () => {
		mockRequest();
		const addResolveDataToEndpointsSpy = sandbox.spy(EndpointResolver.prototype, 'addResolveDataToEndpoints');

		await validateSchema();

		const call = addResolveDataToEndpointsSpy.getCall(0);
		const [first, second] = call.args;

		assert(first.length === 4);
		assert(second.length === 3);
	});

	it('should not repeat request called', async () => {
		mockRequest();
		const resolveEndpointsSpy = sandbox.spy(EndpointResolver.prototype, 'resolveEndpoints');
		const callFetcherSpy = sandbox.spy(EndpointResolver.prototype, 'callFetcher');
		const addResolveDataToEndpointsSpy = sandbox.spy(EndpointResolver.prototype, 'addResolveDataToEndpoints');

		await validateSchema(true);

		assert(resolveEndpointsSpy.calledTwice);
		assert(addResolveDataToEndpointsSpy.calledTwice);
		assert(callFetcherSpy.calledThrice);
	});

});
