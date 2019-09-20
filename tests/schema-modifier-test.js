'use strict';

const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs-extra');
const schemaModifier = require('../lib/schema-modifier');

const schemaCompiled = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse-not-actions.json');
const schemaExpectedOne = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/browse-not-actions.json');
const schemaCompiledTwo = fs.readFileSync(process.cwd() + '/tests/mocks/schemas/expected/edit.json');

const sandbox = sinon.createSandbox();

describe('Test schema-modifier functions', () => {
	beforeEach(() => {
		sandbox.restore();
	});

	it('should pass validation and add actions default', async () => {
		const schemaOne = JSON.parse(schemaCompiled.toString());
		const dataOne = schemaModifier.execute(schemaOne);

		sandbox.assert.match(dataOne, JSON.parse(schemaExpectedOne.toString()));
	});

	it('should pass validation with out changes in browse.json compiled', async () => {
		const schemaOne = JSON.parse(schemaCompiled.toString());

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

		sandbox.assert.match(dataOne, schemaOne);
	});

	it('should pass validation with out changes in edit.json compiled', async () => {
		const schemaOne = JSON.parse(schemaCompiledTwo.toString());
		const addBrowseActionsSpy = sandbox.spy(schemaModifier, 'addBrowseActions');
		const dataOne = schemaModifier.execute(schemaOne);

		assert(addBrowseActionsSpy.notCalled);
		sandbox.assert.match(dataOne, schemaOne);
	});

});
