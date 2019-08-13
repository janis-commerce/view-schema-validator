'use strict';

const Ajv = require('ajv');
const logger = require('lllog')();
const schemas = require('./schemas');
const schemaDefinitions = require('./schemas/definitions');
const schemaModifier = require('./schema-modifier');

const ajv = new Ajv({ allErrors: true, useDefaults: true, schemas: [schemaDefinitions] });

class Validator {
	/**
	 * Take ajv instance and call compile function for validate and generate schema with defaults
	 * @name compile
	 * @param {object} data
	 * @return {object}
	 */
	static compile(data) {
		const compile = ajv.compile(this.currentSchema);
		compile(data);
		return data;
	}

	/**
	 * Take ajv instance and call validate for check validation schema
	 * @name validate
	 * @param {object} schema
	 * @return {boolean}
	 */
	static validate(schema) {
		return ajv.validate(this.currentSchema, schema);
	}

	/**
	 * Handler for Validate or Compile schema
	 * @name execute
	 * @param {object} schema
	 * @param {boolean} compile
	 * @param {string} filePath
	 */
	static execute(schema, compile, filePath) {
		let data;

		if(schema.root) {

			this.currentSchema = schemas[schema.root.toLowerCase()];

			const valid = this.validate(schema);

			if(ajv.errors) {
				const error = new Error();
				error.message = { source: filePath, errors: ajv.errors };
				throw error;
			}

			logger.info(`VALIDATION SUCCESS  --> ${filePath}`);

			if(compile && valid) {
				const compiledData = this.compile(schema);

				data = schemaModifier.execute(compiledData);

				logger.info(`COMPILATION SUCCESS --> ${filePath} `);
			}

		} else
			throw new Error(`root property not defined in ${filePath}`);

		return data;
	}
}

module.exports = Validator;
