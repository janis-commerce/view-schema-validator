'use strict';

const MainForm = require('./mainForm');
const FormSection = require('./formSection');
const BrowseSection = require('./browseSection');
const LogsBrowseSection = require('./logsBrowseSection');
const FilesSection = require('./filesSection');
const OrderItemsSection = require('./orderItemsSection');
const ApiKeysSection = require('./apiKeysSection');
const ImageFilesSection = require('./imageFilesSection');

module.exports = [
	MainForm,
	FormSection,
	BrowseSection,
	LogsBrowseSection,
	FilesSection,
	OrderItemsSection,
	ApiKeysSection,
	ImageFilesSection
];
