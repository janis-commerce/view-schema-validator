"use strict";

const { properties, required } = require("../common/base");
const action = require("../common/actions/action");
const makeConditions = require("../common/conditions");
const getBrowseBaseSchema = require("../common/browseBase");
const makeTopComponents = require("../common/topComponents");
const makeActionCallbacks = require("../common/actionCallbacks");
const redirect = require("../common/redirect");

const conditions = makeConditions();

const makeCustomAction = () => ({
  ...action,
  properties: {
    ...action.properties,
    conditions,
    callback: makeActionCallbacks({ customCallbacks: [] }),
  },
});

const defaultBrowseSchema = {
  type: "object",
  properties: {
    ...properties,
    ...getBrowseBaseSchema(true),
    topComponents: makeTopComponents(true),
    root: { const: "Browse" },
    actions: {
      type: "array",
      items: makeCustomAction(),
    },
  },
  additionalProperties: false,
  required: [...required, "fields", "source"],
};

module.exports = {
  allOf: [
    {
      if: {
        properties: {
          redirect: { type: "object" },
        },
      },
      then: redirect,
      else: defaultBrowseSchema,
    },
  ],
};
