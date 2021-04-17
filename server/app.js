const express = require('express');

const app = express();

// Endpoint to verify the application is up and ready.
//
// It can be used to customize some alert system to get noitified when
// the API is down. Or trigger a restart in the context of container
// orchestration when the API has become unresponsive.
app.get('/health_check', (_, res) => {
  res.status(200).send();
});

module.exports = app;
