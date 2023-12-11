'use strict';

const getCanCreateProps = require('../../edit-new/modules/can-create.js');

module.exports = () => ({
	...getCanCreateProps,
	default: true
});
