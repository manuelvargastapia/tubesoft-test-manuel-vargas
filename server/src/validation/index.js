// We use Joi to validate the requests before handling them.
// Any error is forwarded to the `errorHandler` controller.

const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

// Define a schema to accept milliseconds or seconds as any integer
// number between 0 and 2147483647 (the maximum integer value accepted
// by the database). Also, it makes the fields mutually exclusive.
const bodySchema = Joi.object({
  milliseconds: Joi.number().integer().min(0).max(2147483647),
  seconds: Joi.number().integer().min(0).max(2147483647),
}).xor('milliseconds', 'seconds');

module.exports = { registerTimeBody: validator.body(bodySchema) };
