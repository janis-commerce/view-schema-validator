'use strict';

const Ajv = require('ajv');
const uniqWith = require('lodash.uniqwith');
const isequal = require('lodash.isequal');
const objGet = require('lodash.get');
const objSet = require('lodash.set');
const isMatch = require('lodash.ismatch');
const RouterFetcher = require('@janiscommerce/router-fetcher');
const EndpointResolverLocal = require('@janiscommerce/endpoint-resolver');
const schemaDefinitions = require('./schemas/definitions');

const ajv = new Ajv({ schemas: [schemaDefinitions] });

const routerFetcher = new RouterFetcher();

const requestCache = {};

class EndpointResolver {
	constructor(service) {
		this.service = service;
		this.endpointResolverLocal = new EndpointResolverLocal('schemas/public.json');
	}

	/**
	 * Helper for check if a object is a endpoint source schema valid
	 * @param {Object} obj
	 * @returns {Boolean}
	 */
	static isEndpointSource(obj) {
		return ajv.validate(obj, {
			$ref: 'schemaDefinitions#/definitions/endpoint'
		});
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

		if(this.service && this.service === service)
			promise = this.endpointResolverLocal.resolve(namespace, method);
		else
			promise = routerFetcher.getEndpoint(service, namespace, method);

		// Save promise in requestCache
		objSet(requestCache, `${service}.${namespace}.${method}`, promise);

		return promise;
	}


	/**
	 * Helper for find resolve endpoint data
	 * @param {Object} currentEndpoint
	 * @param {Object} endpointResolved
	 */
	getEndpointResolved(currentEndpoint, endpointResolved) {
		const { service, namespace, method } = endpointResolved;
		return isMatch(currentEndpoint, { service, namespace, method }) ? endpointResolved : false;
	}


	/**
	 * Helper for resolve promises for get endpoints
	 * @param {Object}
	 * @returns {<Promise>}
	 */
	async getEndpoint({ service, namespace, method }) {
		// Find promise in requestCache for not call again this.callFetcher
		const promise = objGet(requestCache, `${service}.${namespace}.${method}`);

		try {
			const response = await (promise || this.callFetcher(service, namespace, method));
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
	 * @param {Array} endpointsToResolve
	 * @param {Array} endpointsResolved
	 */
	addResolveDataToEndpoints(endpointsToResolve, endpointsResolved) {
		endpointsToResolve.forEach(currentEndpoint => {
			const endpoint = endpointsResolved.find(endpointResolved => (
				this.getEndpointResolved(currentEndpoint, endpointResolved)
			));

			if(endpoint) {
				const { httpMethod, url } = endpoint;
				currentEndpoint.httpMethod = httpMethod;
				currentEndpoint.url = url;
			}
		});
	}


	/**
	 * Resolve all endpoints found in the schema.
	 * @param  {Object} schema The schema.
	 * @return {<Promise>} Array with all endpoints resolved.
	*/
	resolveEndpoints(endpointsToResolve) {
		const endpointsToResolveFiltered = uniqWith(endpointsToResolve, isequal);

		const calls = endpointsToResolveFiltered.map(endpoint => this.getEndpoint(endpoint));

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

			if(isObject && !Array.isArray(property) && EndpointResolver.isEndpointSource(property) && property.resolve)
				accum.push(schema[key]);

			if(isObject) {
				if(Array.isArray(property))
					property.map(value => this.findEndpoints(value, accum));
				else
					this.findEndpoints(property, accum);
			}
		}

		return accum;
	}


	async execute(schema) {
		const endpointsToResolve = this.findEndpoints(schema);

		if(endpointsToResolve.length) {
			const endpointsResolved = await this.resolveEndpoints(endpointsToResolve);
			this.addResolveDataToEndpoints(endpointsToResolve, endpointsResolved);
		}

		return schema;
	}
}


module.exports = EndpointResolver;
