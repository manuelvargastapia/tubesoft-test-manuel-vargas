const request = require('supertest');
const { sequelize } = require('./models');

const app = require('./app');

describe('GET /health_check', () => {
  test('It should return OK 200', () => {
    return request(app).get('/health_check').expect(200);
  });
});

describe('POST /register_time', () => {
  // Close db conection after running all the tests
  afterAll(() => {
    sequelize.close();
  });

  test('It should return OK 201 with new item created for valid data', () => {
    const newTime = { registeredTime: 90000 };
    // Mocks to override unpredictable response data
    const mockedResponse = {
      uuid: 'mock-uuid',
      updatedAt: '2021-04-17T19:06:26.044Z',
      createdAt: '2021-04-17T19:06:26.044Z',
    };
    return request(app)
      .post('/register_time')
      .send(newTime)
      .expect((res) => {
        // Override some response elements before evaluating the final response
        res.body.uuid = mockedResponse.uuid;
        res.body.updatedAt = mockedResponse.updatedAt;
        res.body.createdAt = mockedResponse.createdAt;
      })
      .expect(201, {
        uuid: mockedResponse.uuid,
        registeredTime: newTime.registeredTime,
        updatedAt: mockedResponse.updatedAt,
        createdAt: mockedResponse.createdAt,
      });
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
