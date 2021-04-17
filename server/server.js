// We separate the app from the server for testing purposes:
// we can run the app with `node server.js` and also import
// app.js for testing
const app = require('./app');

app.listen(3000, () => {
  // TODO: replace by `debug`
  console.log('Listening on port 3000');
});
