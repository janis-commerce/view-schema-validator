'use strict';

const localValidation = require('./localValidation');
const remoteValidation = require('./remoteValidation');
const literal = require('./literal');
const minMaxLength = require('./minMaxLength');

module.exports = [
	literal,
	minMaxLength,
	remoteValidation,
	localValidation
];
