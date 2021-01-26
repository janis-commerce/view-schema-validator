'use strict';

const MainForm = require('./mainForm');
const FormSection = require('./formSection');
const BrowseSection = require('./browseSection');
const LogsBrowseSection = require('./logsBrowseSection');
const OrderItemsSection = require('./orderItemsSection');
const ApiKeysSection = require('./apiKeysSection');
const FilesSection = require('./section-files/filesSection');
const ImageFilesSection = require('./section-files/imageFilesSection');
const OmsOrderInfo = require('./omsOrderInfo');
const OmsControls = require('./omsControls');
const MultiSection = require('./multiSection');
const Comments = require('./comments');
const OmsOrderHistory = require('./omsOrderHistory');

module.exports = [
	MainForm,
	FormSection,
	BrowseSection,
	LogsBrowseSection,
	OrderItemsSection,
	ApiKeysSection,
	FilesSection,
	ImageFilesSection,
	OmsOrderInfo,
	OmsControls,
	MultiSection,
	Comments,
	OmsOrderHistory
];
