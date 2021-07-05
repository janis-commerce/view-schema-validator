'use strict';

const assert = require('assert');
const sinon = require('sinon');
const { isEdit, isBrowse, getDaysToRemoveFeatureMessage } = require('../../lib/helpers');

describe('helpers', () => {

	afterEach(() => {
		sinon.restore();
	});

	const editSchema = {
		root: 'Edit'
	};

	const browseSchema = {
		root: 'Browse'
	};

	context('isEdit', () => {

		it('should return true if is a edit schema', async () => {
			assert.deepStrictEqual(isEdit(editSchema), true);
		});

		it('should return false if is not a edit schema', async () => {
			assert.deepStrictEqual(isEdit(browseSchema), false);
		});
	});

	context('isBrowse', () => {

		it('should return true if is a browse schema', async () => {
			assert.deepStrictEqual(isBrowse(browseSchema), true);
		});

		it('should return false if is not a browse schema', async () => {
			assert.deepStrictEqual(isBrowse(editSchema), false);
		});
	});

	context('getDaysToRemoveFeatureMessage', () => {

		it('should return empty string if not passed a date', async () => {
			assert.deepStrictEqual(getDaysToRemoveFeatureMessage(), '');
		});

		it('should return empty string if passed a non valid date', async () => {
			assert.deepStrictEqual(getDaysToRemoveFeatureMessage('foo'), '');
		});

		const now = '05/25/2021';
		const removeDay = '07/01/2021';

		beforeEach(() => {
			sinon.useFakeTimers({ now: new Date(now) });
		});

		it(`should return 36 days if the remove day is: \`${removeDay}\` and dateNow is: ${now}`, async () => {
			assert.deepStrictEqual(getDaysToRemoveFeatureMessage(removeDay), 'You have 37 days to fix it.');
		});

		const removeDay2 = '07/01/2020';

		beforeEach(() => {
			sinon.useFakeTimers({ now: new Date(now) });
		});

		it(`should return 0 days if the remove day is: \`${removeDay2}\` and dateNow is: ${now}`, async () => {
			assert.deepStrictEqual(getDaysToRemoveFeatureMessage(removeDay2), 'You have 0 days to fix it.');
		});
	});

});
