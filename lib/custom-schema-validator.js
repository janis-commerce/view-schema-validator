'use strict';

class CustomSchemaValidator {

	/**
	 * Validate if schema edit must have source prop defined
	 * @name validateMainFormSource
	 * @param {object} schema
	 * @return {object}
	 */
	static validateMainFormSource(schema) {
		const hasMainForm = schema.sections.some(({ rootComponent }) => rootComponent === 'MainForm');

		if(hasMainForm && !schema.source)
			throw new Error('Edit Schema requires ´source´ property because MainForm Section exists');

		return schema;
	}

	/**
	 * Check if is a edit schema
	 * @param {object} schema
	 * @return {boolean}
	 */
	static isEdit(schema) {
		return schema.root === 'Edit';
	}

	static execute(schema) {

		if(this.isEdit(schema))
			return this.validateMainFormSource(schema);


		return schema;
	}
}

module.exports = CustomSchemaValidator;
