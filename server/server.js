// We separate the app from the server for testing purposes:
// we can run the app with `node server.js` and also import
// app.js for testing
const app = require('./app');
const { sequelize } = require('./models');

app.listen(3000, async () => {
  // TODO: replace by `debug`
  console.log('Listening on port 3000');
  await sequelize.authenticate();
  console.log('Connected to Postgres!');
});
