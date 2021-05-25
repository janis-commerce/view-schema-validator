'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const schemaModifier = require('../lib/schema-modifier');

const browseNotActionsSchemaCompiled = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse-not-actions.json');
const browseSchemaExpected = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse.json');
const editSchemaCompiled = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit.json');

describe('Test schema-modifier functions', () => {
	beforeEach(() => {
		sinon.restore();
	});

	it('should pass validation and add actions default', async () => {
		const schemaOne = JSON.parse(browseNotActionsSchemaCompiled.toString());
		const dataOne = schemaModifier.execute(schemaOne);

		assert.deepEqual(dataOne, JSON.parse(browseSchemaExpected.toString()));
	});

	it('should pass validation and not add actions default is has empty array', () => {
		const schemaOne = JSON.parse(browseNotActionsSchemaCompiled.toString());
		const schemaTwo = JSON.parse(browseNotActionsSchemaCompiled.toString());
		const addBrowseActionsSpy = sinon.spy(schemaModifier, 'addBrowseActions');

		schemaOne.actions = [];

		const dataOne = schemaModifier.execute(schemaOne);

		schemaTwo.actions = [];

		assert(addBrowseActionsSpy.notCalled);
		assert.deepEqual(dataOne, schemaTwo);
	});

	it('should pass validation and not add actions default if canCreate property is false', () => {
		const schemaOne = JSON.parse(browseNotActionsSchemaCompiled.toString());
		const addBrowseActionsSpy = sinon.spy(schemaModifier, 'addBrowseActions');

		schemaOne.canCreate = false;

		const dataOne = schemaModifier.execute(schemaOne);

		assert(addBrowseActionsSpy.notCalled);

		assert.deepEqual(dataOne, schemaOne);
	});

	it('should pass validation with out changes in browse.json compiled', async () => {
		const schemaOne = JSON.parse(browseNotActionsSchemaCompiled.toString());

		schemaOne.actions = [{
			name: 'new',
			icon: 'star_light',
			color: 'fizzGreen',
			type: 'link',
			options: {
				path: '/sac/claim-type/new'
			}
		}];

		const dataOne = schemaModifier.execute(schemaOne);

		assert.deepEqual(dataOne, schemaOne);
	});

	it('should pass validation with out changes in edit.json compiled', async () => {
		const schemaOne = JSON.parse(editSchemaCompiled.toString());
		const addBrowseActionsSpy = sinon.spy(schemaModifier, 'addBrowseActions');
		const dataOne = schemaModifier.execute(schemaOne);

		assert(addBrowseActionsSpy.notCalled);
		assert.deepEqual(dataOne, schemaOne);
	});

});
