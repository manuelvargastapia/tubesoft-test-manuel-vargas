const express = require('express');
const Joi = require('joi');

const app = express();

const validator = require('express-joi-validation').createValidator();

const querySchema = Joi.object({
  registeredTime: Joi.number().integer().min(0).max(2147483647).required(),
});

// Parse application/json
app.use(express.json());

// Endpoint to verify the application is up and ready.
//
// It can be used to customize some alert system to get noitified when
// the API is down. Or trigger a restart in the context of container
// orchestration when the API has become unresponsive.
app.get('/health_check', (_, res) => {
  res.status(200).send();
});

// Endpoint to register the time sended by client in miliseconds
app.post('/register_time', validator.body(querySchema), (_, res) => {
  res.status(200).send();
});

module.exports = app;
