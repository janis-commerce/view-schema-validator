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

	return {
		resolveStub,
		getEndpointStub
	};
};

const validateSchema = async (twice = false) => {
	const schemaOne = ymljs.parse(schemaExampleYml.toString());
	const schemaTwo = ymljs.parse(schemaExampleYml.toString());
	const schemaValidatedOne = Validator.execute(schemaOne, true, '/test/data.json');
	const schemaValidatedTwo = Validator.execute(schemaTwo, true, '/test/data.json');

	const endpointResolver = new EndpointResolver('sac');
	endpointResolver.execute.bind(endpointResolver);

	const schemaResolved = await endpointResolver.execute(schemaValidatedOne);

	if(twice)
		await endpointResolver.execute(schemaValidatedTwo);

	return schemaResolved;
};

describe('Test endpoint resolver', () => {
	beforeEach(() => {
		sandbox.restore();
	});

	// your tests here...
	it('Should pass validation in resolve endpoints', async () => {
		const {
			resolveStub,
			getEndpointStub
		} = mockRequest();

		const callFetcherSpy = sandbox.spy(EndpointResolver.prototype, 'callFetcher');
		const resolveEndpointsSpy = sandbox.spy(EndpointResolver.prototype, 'resolveEndpoints');
		const addResolveDataToEndpointSpy = sandbox.spy(EndpointResolver.prototype, 'addResolveDataToEndpoint');

		const schemaResolved = await validateSchema();

		assert(resolveEndpointsSpy.calledOnce);
		assert(addResolveDataToEndpointSpy.callCount === 4);
		assert(callFetcherSpy.callCount === 4);
		assert(resolveStub.callCount === 2);
		assert(getEndpointStub.callCount === 1);

		assert.deepEqual(JSON.stringify(schemaResolved, null, 4), schemaExpectedExample.toString());
	});


	it('should error if fail some request', async () => {
		mockRequest(true);

		await assert.rejects(async () => { await validateSchema(); }, {
			message: 'Fail call routerFetcher for {"service":"id","namespace":"admin","method":"list"}'
		});
	});

	it('should not repeat request called in multiple validation', async () => {
		const {
			resolveStub,
			getEndpointStub
		} = mockRequest();

		const resolveEndpointsSpy = sandbox.spy(EndpointResolver.prototype, 'resolveEndpoints');
		const callFetcherSpy = sandbox.spy(EndpointResolver.prototype, 'callFetcher');
		const addResolveDataToEndpointSpy = sandbox.spy(EndpointResolver.prototype, 'addResolveDataToEndpoint');

		await validateSchema(true);

		assert(resolveEndpointsSpy.calledTwice);
		assert(addResolveDataToEndpointSpy.callCount === 8);
		assert(resolveStub.callCount === 2);
		assert(getEndpointStub.callCount === 1);
		assert(callFetcherSpy.callCount === 8);
	});

});