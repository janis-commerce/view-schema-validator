'use strict';

const Ajv = require('ajv');
const logger = require('lllog')();
const schemas = require('./schemas');
const schemaDefinitions = require('./schemas/definitions');

const ajv = new Ajv({ allErrors: true, useDefaults: true, schemas: [schemaDefinitions] });

class Validator {
	static compile(data) {
		const compile = ajv.compile(this.currentSchema);
		compile(data);
		return data;
	}

	static validate(schema) {
		return ajv.validate(this.currentSchema, schema);
	}

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
				data = this.compile(schema);
				logger.info(`COMPILATION SUCCESS --> ${filePath} `);
			}

		} else
			throw new Error(`root property not defined in ${filePath}`);

		return data;
	}
}

module.exports = Validator;
