const express = require('express');
const Joi = require('joi');
const { Times } = require('../models');
const validator = require('express-joi-validation').createValidator();

const querySchema = Joi.object({
  registeredTime: Joi.number().integer().min(0).max(2147483647).required(),
});

const app = express();

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
app.post('/register_time', validator.body(querySchema), async (req, res) => {
  try {
    const newTime = await Times.create({
      registeredTime: req.body.registeredTime,
    });
    return res.status(201).json(newTime);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = app;
