'use strict';

const Ajv = require('ajv');
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
			console.log(`${compile ? 'Building' : 'Validating'} ${filePath}`);

			this.currentSchema = schemas[schema.root.toLowerCase()];

			const valid = this.validate(schema, filePath);

			if(ajv.errors)
				throw ajv.errors;

			if(compile && valid)
				data = this.compile(schema);

		} else
			throw new Error(`root property not defined in ${filePath}`);

		return data;
	}
}

module.exports = Validator;
