const request = require('supertest');
const { sequelize, Times } = require('../models');
const { when } = require('jest-when');

const app = require('../src/app');

describe('GET /health_check', () => {
  test('It should return OK 200', () => {
    return request(app).get('/health_check').expect(200);
  });
});

describe('POST /register_time', () => {
  const spiedCreate = jest.spyOn(Times, 'create');

  // Close db conection after running all the tests
  afterAll(() => {
    sequelize.close();
  });

  test('It should return OK 201 with new item created for valid data', (done) => {
    const newTime = { registeredTime: 90000 };

    // Mocks to override unpredictable response data
    const mockedResponse = {
      uuid: 'mock-uuid',
      updatedAt: '2021-04-17T19:06:26.044Z',
      createdAt: '2021-04-17T19:06:26.044Z',
    };

    request(app)
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
      })
      .then((_) => {
        expect(spiedCreate.mock.calls.length).toBe(1);
        expect(spiedCreate.mock.calls[0][0]).toStrictEqual(newTime);
        done();
      });
  });

  test('It should return BAD REQUEST 400 when data is missing', (done) => {
    const testCases = [{ registeredTime: null }, null];
    for (const invalidData in testCases) {
      request(app)
        .post('/register_time')
        .send(invalidData)
        .then((res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body).toHaveProperty('error');
          expect(res.body).toHaveProperty('message');
          expect(res.body.error).toContain('Invalid data in');
          done();
        });
    }
    expect(spiedCreate.mock.calls.length).toBe(0);
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
        .then((res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body).toHaveProperty('error');
          expect(res.body).toHaveProperty('message');
          expect(res.body.error).toContain('Invalid data in');
          done();
        });
    }
    expect(spiedCreate.mock.calls.length).toBe(0);
  });

  test('It should return 500 INTERNAL SERVER ERROR when resource creation fails', (done) => {
    const newTime = { registeredTime: 5000 };
    const errorMessage = 'Unexpected Error';

    when(spiedCreate)
      .calledWith(expect.anything())
      // All Sequelize error inherits from the base JS Error class
      .mockRejectedValue(new Error(errorMessage));

    return request(app)
      .post('/register_time')
      .send(newTime)
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toStrictEqual({
          error: 'Internal server error',
          message: errorMessage,
        });
        expect(spiedCreate.mock.calls[0][0]).toStrictEqual(newTime);
        expect(spiedCreate.mock.calls.length).toBe(1);
        done();
      });
  });
});
