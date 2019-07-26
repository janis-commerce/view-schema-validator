'use strict';

const browse = require('./browse/schema');
const edit = require('./edit/schema');
const create = require('./new/schema');
const schema = require('./base');

module.exports = {
	schema,
	browse,
	edit,
	new: create
};
