'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db_config.json')[env];
const db = {};

// Use env vars when building with Docker and config.json when
// building locally
let sequelize = new Sequelize(
  process.env.DB_NAME || config.database,
  process.env.DB_USER || config.username,
  process.env.DB_PASSWORD || config.password,
  {
    host: process.env.DB_HOST || config.host,
    port: process.env.DB_PORT || config.port,
    dialect: process.env.DB_DIALECT || config.dialect,
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
