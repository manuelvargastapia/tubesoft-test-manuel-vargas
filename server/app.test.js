const request = require('supertest');

const app = require('./app');

describe('GET /health_check', () => {
  test('It should return OK 200', () => {
    return request(app).get('/health_check').expect(200);
  });
});

describe('POST /register_time', () => {
  test('It should return OK 200 for valid data', () => {
    return request(app)
      .post('/register_time')
      .send({ registeredTime: 90000 })
      .expect(200);
  });

  test('It should return BAD REQUEST 400 when data is missing', (done) => {
    const testCases = [{ registeredTime: null }, null];
    for (const invalidData in testCases) {
      request(app)
        .post('/register_time')
        .send(invalidData)
        .then((response) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    }
  });

  test('It should return BAD REQUEST 400 when registeredTime is invalid', (done) => {
    // It shouldn't be negative, decimal or > 2147483647 (max DB storage for integers)
    const testCases = [
      { registeredTime: -1000 },
      { registeredTime: 123.0 },
      { registeredTime: 456.789 },
      { registeredTime: 2147483648 },
    ];

    for (const invalidData in testCases) {
      request(app)
        .post('/register_time')
        .send(invalidData)
        .then((response) => {
          expect(response.statusCode).toBe(400);
          done();
        });
    }
  });
});
