'use strict';

const browse = require('./browse/schema');
const edit = require('./edit/schema');
const create = require('./new/schema');
const dashboard = require('./dashboard/schema');
const preview = require('./preview/schema');
const defaultSchema = require('./default/schema');
const sectionSchema = require('./section/schema');

module.exports = {
	browse,
	edit,
	create,
	dashboard,
	preview,
	sectionSchema,
	defaultSchema
};
