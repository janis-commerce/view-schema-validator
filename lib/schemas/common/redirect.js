"use strict";

const source = require("./endpoint");
const endpointParameters = require("./endpointParameters");

module.exports = {
  type: "object",
  properties: {
    source,
  },
  additionalProperties: endpointParameters,
  required: ["source"],
};
