'use strict';

// prefix with common and views '^(?:(?!common\\.|views\\.).)*$'

module.exports = {
	type: 'string',
	pattern: '^(?:(?!views\\.).)*$'
	// pattern: '^(?:(?!views\\.|common\\.[A-Za-z0-9]+\\.[A-Za-z0-9]).)*$'
};
