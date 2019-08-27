'use strict';

const MainForm = require('./mainForm');
const BrowseSection = require('./browseSection');
const { makeSections } = require('../../../utils');

module.exports = makeSections([
	MainForm,
	BrowseSection
]);
