'use strict';

const browse = require('./browse/schema');
const edit = require('./edit/schema');
const create = require('./new/schema');

module.exports = {
	browse,
	edit,
	new: create
};
