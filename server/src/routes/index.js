'use strict';

exports.createRoutes = (app) => {
  const express = require('express');
  const cors = require('cors');
  const { healthCheck, registerTime } = require('../controllers');
  const { registerTimeBodyValidator, errorHandler } = require('../middlewares');

  app.use(express.json());
  app.use(cors());

  // Endpoint to verify the application is up and ready.
  //
  // It can be used to customize some alert system to get noitified when
  // the API is down. Or trigger a restart in the context of container
  // orchestration when the API has become unresponsive.
  app.get('/health_check', healthCheck);

  // Endpoint to register the time sended by client in miliseconds
  app.post('/register_time', registerTimeBodyValidator, registerTime);

  app.use(errorHandler);
};
