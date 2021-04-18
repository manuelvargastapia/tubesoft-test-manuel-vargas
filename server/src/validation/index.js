// We use Joi to validate the requests before handling them.
// Any error is forwarded to the `errorHandler` controller.

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

// Define a schema to accept any integer number between 0 and 2147483647
// (tha maximum integer value accepted by database)
const bodySchema = Joi.object({
  registeredTime: Joi.number().integer().min(0).max(2147483647).required(),
});

module.exports = { registerTimeBody: validator.body(bodySchema) };
