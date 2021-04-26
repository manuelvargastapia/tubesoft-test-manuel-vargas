#!/usr/bin/env bash

# Tear down containers preventively.
# Similarly, use 'sudo' as a preventive measure in case the host
# machine requires it
sudo docker-compose -f ../docker-compose.yml down

# Use docker-compose file to run only the postgres container.
# Also, use a specific env file with connection values for testing
sudo docker-compose -f ../docker-compose.yml --env-file ../.env.test up -d postgres

# Wait for Postgres to accept connections.
# Postgres usually does not accept connections immediately after it is 
# started up, that's why we use the pg_isready utility.
WAIT_FOR_PG_ISREADY="while ! pg_isready; do sleep 1; done;"
sudo docker-compose -f ../docker-compose.yml exec postgres bash -c "$WAIT_FOR_PG_ISREADY"

# Use docker-test values to connect to DB according to src/config/db_config.js
export NODE_ENV=docker-test

# Install dependencies locally
npm install

# Prepare DB
sequelize-cli db:migrate

# Run tests
jest --coverage --verbose

# Tear down containers after tests
sudo docker-compose -f ../docker-compose.yml down
