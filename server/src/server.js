'use strict';

// We separate the app from the server for testing purposes:
// we can run the app with `node src/server.js` and also import
// app.js for integration testing
const app = require('./app');
const { sequelize } = require('./models');
const { port } = require('./config/app_config.json');

// Use env vars when building with Docker and config.json when
// building locally
const server = app.listen(process.env.PORT || port);
console.log(`Listening on port ${port}`);

// Check database connection status
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log("Couldn't connect to database:", error.message);
    server.close(() => {
      console.log('Server closed');
    });
  });
