'use strict';

const browse = require('./browse/schema');
const edit = require('./edit/schema');
const create = require('./new/schema');
const defaultSchema = require('./default/schema');

module.exports = {
	browse,
	edit,
	create,
	defaultSchema
};
