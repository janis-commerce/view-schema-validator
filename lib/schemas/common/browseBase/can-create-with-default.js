'use strict';

const getCanCreateProps = require('../../common/can-create');

module.exports = () => ({
	...getCanCreateProps,
	default: true
});
