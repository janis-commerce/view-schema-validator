'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const ymljs = require('yamljs');
const RouterFetcher = require('@janiscommerce/router-fetcher');
const EndpointResolverLocal = require('@janiscommerce/endpoint-resolver');
const Validator = require('../lib/validator');
const EndpointResolver = require('../lib/endpoint-resolver');

const editWithSorceSchemaExampleYml = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/edit-with-sources.yml');
const editWithSorceSchemaExampleJson = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit-with-sources.json');

const mockRequest = (rejectOne = false) => {
	const getEndpointStub = sinon.stub(RouterFetcher.prototype, 'getEndpoint');
	const resolveStub = sinon.stub(EndpointResolverLocal.prototype, 'resolve');

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
		.withArgs('claim-type', 'save')
		.returns({
			httpMethod: 'post',
			url: 'http://sac.janis.localhost:3009/api/claim-type/{id}'
		});

	resolveStub
		.withArgs('claim-type', 'get')
		.returns({
			httpMethod: 'get',
			url: 'http://sac.janis.localhost:3009/api/claim-type/{id}'
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
	const schemaOne = ymljs.parse(editWithSorceSchemaExampleYml.toString());
	const schemaTwo = ymljs.parse(editWithSorceSchemaExampleYml.toString());
	const schemaValidatedOne = Validator.execute(schemaOne, true, '/test/data.json');
	const schemaValidatedTwo = Validator.execute(schemaTwo, true, '/test/data.json');

	const endpointResolver = new EndpointResolver('sac', 'local');

	endpointResolver.execute.bind(endpointResolver);

	const schemaResolved = await endpointResolver.execute(schemaValidatedOne);

	if(twice)
		await endpointResolver.execute(schemaValidatedTwo);

	return schemaResolved;
};

describe('Test endpoint resolver', () => {
	beforeEach(() => {
		sinon.restore();
	});

	it('Should pass validation in resolve endpoints', async () => {
		const {
			resolveStub,
			getEndpointStub
		} = mockRequest();

		const callFetcherSpy = sinon.spy(EndpointResolver.prototype, 'callFetcher');
		const resolveEndpointsSpy = sinon.spy(EndpointResolver.prototype, 'resolveEndpoints');
		const addResolveDataToEndpointSpy = sinon.spy(EndpointResolver.prototype, 'addResolveDataToEndpoint');

		const schemaResolved = await validateSchema();

		assert(resolveEndpointsSpy.calledOnce);
		assert(addResolveDataToEndpointSpy.callCount === 6);
		assert(callFetcherSpy.callCount === 6);
		assert(resolveStub.callCount === 4);
		assert(getEndpointStub.callCount === 1);

		assert.deepEqual(JSON.stringify(schemaResolved, null, 4), editWithSorceSchemaExampleJson.toString());
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

		const resolveEndpointsSpy = sinon.spy(EndpointResolver.prototype, 'resolveEndpoints');
		const callFetcherSpy = sinon.spy(EndpointResolver.prototype, 'callFetcher');
		const addResolveDataToEndpointSpy = sinon.spy(EndpointResolver.prototype, 'addResolveDataToEndpoint');

		await validateSchema(true);

		assert(resolveEndpointsSpy.calledTwice);
		assert(addResolveDataToEndpointSpy.callCount === 12);
		assert(resolveStub.callCount === 4);
		assert(getEndpointStub.callCount === 1);
		assert(callFetcherSpy.callCount === 12);
	});

	it('should called EndpointResolverLocal with env beta ', () => {
		const endpointResolver = new EndpointResolver('sac', 'beta');

		assert(endpointResolver.endpointResolverLocal.environment === 'beta');
	});
});
