#!/usr/bin/env bash

# Use local-test values to connect to DB according to src/config/db_config.js
export NODE_ENV=local-test

# Prepare DB
sequelize-cli db:create
sequelize-cli db:migrate

# Run tests
jest --coverage --verbose

# Remove DB
sequelize-cli db:drop