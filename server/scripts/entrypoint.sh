#!/usr/bin/env bash

# Use docker values to connect to DB according to src/config/db_config.js
export NODE_ENV=docker

npx sequelize-cli db:migrate

npm start