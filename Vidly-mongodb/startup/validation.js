const { func } = require("joi");
const Joi = require("joi");
module.exports = function () {
  Joi.objectId = require("Joi-objectid")(Joi);
};
