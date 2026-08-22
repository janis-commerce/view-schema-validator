'use strict';

const assert = require('assert');
const Validator = require('../lib/validator');

const filePath = '/test/browse-row-actions.json';

const makeBrowseSchema = actionsData => ({
	root: 'Browse',
	service: 'sac',
	name: 'claim-type-browse',
	source: {
		service: 'sac',
		namespace: 'claim-type',
		method: 'browse',
		resolve: false
	},
	fields: [
		{
			name: 'actions',
			component: 'ActionButtons',
			componentAttributes: { actionsData }
		}
	]
});

const makeFormAction = componentAttributes => ({
	name: 'assignUser',
	title: 'schema.action.assignUser',
	type: 'form',
	componentAttributes
});

const formComponentAttributes = {
	variant: 'contained',
	icon: 'user',
	iconColor: 'fizzGreen',
	modalSize: 'small',
	endpoint: {
		service: 'sac',
		namespace: 'claim',
		method: 'update',
		resolve: false
	},
	endpointParameters: { id: 'id' },
	fields: [
		{ name: 'userId', component: 'Input', label: 'schema.field.userId' },
		{ name: 'observation', component: 'Textarea' }
	]
};

const getValidationErrors = schema => {
	let validationErrors;

	assert.throws(
		() => Validator.execute(schema, false, filePath),
		error => {
			validationErrors = error.errors;
			return error.message === `Validation error in ${filePath}`;
		}
	);

	return validationErrors;
};

const hasError = (validationErrors, { keyword, property, dataPathEnd }) => validationErrors.some(validationError => {
	const { params, dataPath } = validationError;
	return validationError.keyword === keyword &&
		(params.missingProperty === property || params.additionalProperty === property) &&
		dataPath.endsWith(dataPathEnd);
});

describe('Browse row actions', () => {

	context('form action', () => {

		it('should validate a form action that declares the modal in componentAttributes', () => {
			const schema = makeBrowseSchema([makeFormAction(formComponentAttributes)]);

			assert.doesNotThrow(() => Validator.execute(schema, false, filePath));
		});

		it('should validate a form action with the minimal componentAttributes', () => {
			const schema = makeBrowseSchema([
				makeFormAction({ fields: [{ name: 'userId', component: 'Input' }] })
			]);

			assert.doesNotThrow(() => Validator.execute(schema, false, filePath));
		});

		it('should validate a form action along with the legacy action types', () => {
			const schema = makeBrowseSchema([
				makeFormAction(formComponentAttributes),
				{
					name: 'new',
					icon: 'star_light',
					color: 'fizzGreen',
					type: 'link',
					options: { path: '/sac/claim-type/new' },
					callback: 'removeRow'
				}
			]);

			assert.doesNotThrow(() => Validator.execute(schema, false, filePath));
		});

		it('should validate a form action declared in the browse actions', () => {
			const schema = makeBrowseSchema([]);
			schema.fields[0].componentAttributes.actionsData = [makeFormAction(formComponentAttributes)];
			schema.actions = [makeFormAction(formComponentAttributes)];

			assert.doesNotThrow(() => Validator.execute(schema, false, filePath));
		});

		it('should keep the componentAttributes untouched when compiling', () => {
			const schema = makeBrowseSchema([makeFormAction(formComponentAttributes)]);

			const compiledSchema = Validator.execute(schema, true, filePath);
			const [compiledAction] = compiledSchema.fields[0].componentAttributes.actionsData;

			assert.deepStrictEqual(compiledAction.componentAttributes.modalSize, 'small');
			assert.deepStrictEqual(compiledAction.componentAttributes.endpointParameters, { id: 'id' });
			assert.deepStrictEqual(
				compiledAction.componentAttributes.fields.map(({ name, component }) => ({ name, component })),
				[
					{ name: 'userId', component: 'Input' },
					{ name: 'observation', component: 'Textarea' }
				]
			);
		});

		it('should not validate a form action without fields', () => {
			const schema = makeBrowseSchema([
				makeFormAction({ endpoint: { service: 'sac', namespace: 'claim', method: 'update' } })
			]);

			const validationErrors = getValidationErrors(schema);

			assert.deepStrictEqual(
				hasError(validationErrors, {
					keyword: 'required',
					property: 'fields',
					dataPathEnd: '.actionsData[0].componentAttributes'
				}),
				true
			);
		});

		it('should not validate a form action without componentAttributes', () => {
			const schema = makeBrowseSchema([
				{ name: 'assignUser', title: 'schema.action.assignUser', type: 'form' }
			]);

			const validationErrors = getValidationErrors(schema);

			assert.deepStrictEqual(
				hasError(validationErrors, {
					keyword: 'required',
					property: 'componentAttributes',
					dataPathEnd: '.actionsData[0]'
				}),
				true
			);
		});

		it('should not validate a form action with an empty fields array', () => {
			const schema = makeBrowseSchema([makeFormAction({ fields: [] })]);

			const validationErrors = getValidationErrors(schema);

			assert.deepStrictEqual(
				validationErrors.some(({ keyword, dataPath }) => keyword === 'minItems' &&
					dataPath.endsWith('.actionsData[0].componentAttributes.fields')),
				true
			);
		});

		it('should not validate a form action with an unknown componentAttribute', () => {
			const schema = makeBrowseSchema([
				makeFormAction({ ...formComponentAttributes, modalTitle: 'Assign user' })
			]);

			const validationErrors = getValidationErrors(schema);

			assert.deepStrictEqual(
				hasError(validationErrors, {
					keyword: 'additionalProperties',
					property: 'modalTitle',
					dataPathEnd: '.actionsData[0].componentAttributes'
				}),
				true
			);
		});

		it('should not validate a form action with a field that is not an edit-new field', () => {
			const schema = makeBrowseSchema([
				makeFormAction({ fields: [{ name: 'remainingTime', component: 'CountDown' }] })
			]);

			const validationErrors = getValidationErrors(schema);

			assert.deepStrictEqual(
				validationErrors.some(({ keyword, dataPath }) => keyword === 'enum' &&
					dataPath.endsWith('.actionsData[0].componentAttributes.fields[0].component')),
				true
			);
		});
	});

	context('legacy actions', () => {

		it('should validate a link action', () => {
			const schema = makeBrowseSchema([
				{
					name: 'new',
					icon: 'star_light',
					color: 'fizzGreen',
					type: 'link',
					options: { path: '/sac/claim-type/new' },
					callback: 'removeRow'
				}
			]);

			assert.doesNotThrow(() => Validator.execute(schema, false, filePath));
		});

		it('should validate an endpoint action', () => {
			const schema = makeBrowseSchema([
				{
					name: 'testAction',
					icon: 'star_light',
					color: 'fizzGreen',
					type: 'endpoint',
					options: {
						endpoint: {
							service: 'sac',
							namespace: 'claim',
							method: 'get',
							resolve: false
						},
						endpointParameters: { id: 'id' }
					},
					callback: 'reloadRow'
				}
			]);

			assert.doesNotThrow(() => Validator.execute(schema, false, filePath));
		});

		it('should validate an openModal action', () => {
			const schema = makeBrowseSchema([
				{
					name: 'testAction',
					type: 'endpoint',
					callback: 'openModal',
					options: {
						endpoint: {
							service: 'sac',
							namespace: 'claim',
							method: 'get',
							resolve: false
						},
						modalTitle: 'Claim detail',
						fields: [{ name: 'claimId', component: 'Text' }]
					}
				}
			]);

			assert.doesNotThrow(() => Validator.execute(schema, false, filePath));
		});

		it('should not validate an unknown option in a link action', () => {
			const schema = makeBrowseSchema([
				{
					name: 'new',
					type: 'link',
					options: { path: '/sac/claim-type/new', fields: [] }
				}
			]);

			const validationErrors = getValidationErrors(schema);

			assert.deepStrictEqual(
				hasError(validationErrors, {
					keyword: 'additionalProperties',
					property: 'fields',
					dataPathEnd: '.actionsData[0].options'
				}),
				true
			);
		});

		it('should not validate componentAttributes in an action that is not a form', () => {
			const schema = makeBrowseSchema([
				{
					name: 'testAction',
					type: 'endpoint',
					componentAttributes: { icon: 'star_light' },
					options: {
						endpoint: {
							service: 'sac',
							namespace: 'claim',
							method: 'get',
							resolve: false
						}
					}
				}
			]);

			const validationErrors = getValidationErrors(schema);

			assert.deepStrictEqual(
				hasError(validationErrors, {
					keyword: 'additionalProperties',
					property: 'icon',
					dataPathEnd: '.actionsData[0].componentAttributes'
				}),
				true
			);
		});
	});
});
