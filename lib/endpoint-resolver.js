'use strict';

const Ajv = require('ajv');
const objGet = require('lodash.get');
const objSet = require('lodash.set');
const RouterFetcher = require('@janiscommerce/router-fetcher');
const EndpointResolverLocal = require('@janiscommerce/endpoint-resolver');
const endpointSchema = require('./schemas/common/endpoint');

const ajv = new Ajv();

const routerFetcher = new RouterFetcher();

class EndpointResolver {
	constructor(service, env) {
		this.service = service;

		this.endpointResolverLocal = new EndpointResolverLocal('schemas/public.json', env);
		this.requestCache = {};
	}


	/**
	 * Helper for check if a object is a endpoint source schema valid
	 * @param {Object} obj
	 * @returns {Boolean}
	 */
	static isEndpointSource(obj) {
		return ajv.validate(endpointSchema, obj);
	}


	/**
	 * Helper for call router fetcher for get endpoint data
	 * @param {string} service
	 * @param {string} namespace
	 * @param {string} method
	 * @return {<Promise>}
	 */
	callFetcher(service, namespace, method) {
		let promise;

		const cacheKey = `${service}.${namespace}.${method}`;

		// Get promise in requestCache
		const cachedPromise = objGet(this.requestCache, cacheKey);

		if(cachedPromise)
			return cachedPromise;

		if(this.service && this.service === service)
			promise = this.endpointResolverLocal.resolve(namespace, method);
		else
			promise = routerFetcher.getEndpoint(service, namespace, method);

		// Save promise in requestCache
		objSet(this.requestCache, cacheKey, promise);

		return promise;
	}


	/**
	 * Helper for resolve promises for get endpoints
	 * @param {Object}
	 * @returns {<Promise>}
	 */
	async getEndpoint({ service, namespace, method }) {
		try {
			const response = await this.callFetcher(service, namespace, method);
			const { url, endpoint, httpMethod } = response;

			return {
				service,
				namespace,
				method,
				url: endpoint || url,
				httpMethod
			};

		} catch(err) {
			const error = new Error(`Fail call routerFetcher for ${JSON.stringify({ service, namespace, method })}`);
			error.errors = [err];
			throw error;
		}

	}


	/**
	 * Add resolve data in all endpoints into schema
	 * @param {Object} endpointToResolve
	 * @param {Object} endpointResolved
	 */
	addResolveDataToEndpoint(endpointToResolve, endpointResolved) {
		const { httpMethod, url } = endpointResolved;
		endpointToResolve.httpMethod = httpMethod.toLowerCase();
		endpointToResolve.url = url;
	}


	/**
	 * Resolve all endpoints found in the schema.
	 * @param  {Object} schema The schema.
	 * @return {<Promise>} Array with all endpoints resolved.
	*/
	resolveEndpoints(endpointsToResolve) {
		const calls = endpointsToResolve.map(endpoint => (
			this.getEndpoint(endpoint)
				.then(resolvedEndpoint => this.addResolveDataToEndpoint(endpoint, resolvedEndpoint))
		));

		return Promise.all(calls);
	}


	/**
	 * Find all endpoint sources recursivitly in schema
	 * @param {Object} schem
	 * @param {Array} accum
	 */
	findEndpoints(schema, accum = []) {
		for(const key of Object.keys(schema)) {
			const property = schema[key];

			const isObject = property instanceof Object;
			const isArray = Array.isArray(property);

			if(isObject && !isArray && EndpointResolver.isEndpointSource(property) && property.resolve)
				accum.push(schema[key]);
			else if(isObject) {
				if(isArray)
					property.map(value => this.findEndpoints(value, accum));
				else
					this.findEndpoints(property, accum);
			}
		}

		return accum;
	}


	async execute(schema) {
		const endpointsToResolve = this.findEndpoints(schema);

		if(endpointsToResolve.length)
			await this.resolveEndpoints(endpointsToResolve);

		return schema;
	}
}


module.exports = EndpointResolver;
