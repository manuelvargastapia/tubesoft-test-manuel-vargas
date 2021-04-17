const express = require('express');
const Joi = require('joi');
const { Times } = require('../models');
const validator = require('express-joi-validation').createValidator({
  passError: true,
});

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
app.post(
  '/register_time',
  validator.body(querySchema),
  async (req, res, next) => {
    try {
      const newTime = await Times.create({
        registeredTime: req.body.registeredTime,
      });
      return res.status(201).json(newTime);
    } catch (error) {
      next(error);
    }
  }
);

app.use((err, _, res, __) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      error: `Invalid data in ${err.type}`,
      message: err.error.toString(),
    });
  } else {
    res
      .status(500)
      .json({ error: 'Internal server error', message: err.message });
  }
});

module.exports = app;
