const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

const querySchema = Joi.object({
  registeredTime: Joi.number().integer().min(0).max(2147483647).required(),
});

module.exports = { registerTimeBody: validator.body(querySchema) };
