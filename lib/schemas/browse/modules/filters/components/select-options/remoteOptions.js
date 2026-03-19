'use strict';

const getEndpointParameters = require('../../../../../common/endpointParameters');
const getRemoteOptions = require('../../../../../common/remoteOptions');

module.exports = getRemoteOptions(getEndpointParameters(true));
