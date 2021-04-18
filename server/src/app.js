const express = require('express');
const { createRoutes } = require('./routes');

const app = express();
createRoutes(app);

module.exports = app;
