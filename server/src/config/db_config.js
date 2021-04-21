module.exports = {
  // Local environment.
  // Requires a running DB; it could be used the Postgres image
  // setted up by docker-compose.yml
  development: {
    username: 'postgres',
    password: 'password',
    database: 'timekeeper_db',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  },

  // Local environment for tests.
  // Requires a running DB; it could be used the Postgres image
  // setted up by docker-compose.yml.
  // A test DB is created before running the tests and dropped afterwards.
  'local-test': {
    username: 'postgres',
    password: 'password',
    database: 'timekeeper_db_test',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  },

  // Docker Compose environment.
  // Using docker-compose.yml file, this environment is populated
  // with environment variables provided by Docker.
  // It allows the interaction between the server container and
  // the Postgres container.
  docker: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },

  // Docker environment for tests.
  // Use docker-compose.yml to run the tests against the Postgres
  // container.
  'docker-test': {
    username: 'postgres',
    password: 'password',
    database: 'timekeeper_db_test',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  },
};
