'use strict';

const browse = require('./browse/schema');
const create = require('./new/schema');
const dashboard = require('./dashboard/schema');
const defaultSchema = require('./default/schema');
const edit = require('./edit/schema');
const monitor = require('./monitor/schema');
const planning = require('./planning/schema');
const preview = require('./preview/schema');
const sectionSchema = require('./section/schema');
const settings = require('./settings/schema');

module.exports = {
	browse,
	create,
	dashboard,
	defaultSchema,
	edit,
	monitor,
	planning,
	preview,
	sectionSchema,
	settings
};
