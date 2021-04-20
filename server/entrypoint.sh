#!/usr/bin/env bash

# In runtime, pass postgres URL generated using docker-compose.yml data.
# Otherwise, sequelize-cli db:migrate will use server/src/config/config.json file
DOCKER_DB_URL="postgres://postgres:password@postgres/timekeeper_db"

npx sequelize-cli db:migrate --url ${DOCKER_DB_URL}
npm start