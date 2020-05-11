'use strict';

const topComponents = require('./components/topComponents');
const makeConditions = require('../../../common/conditions');

module.exports = {
	topComponents,
	conditions: makeConditions(false)
};
