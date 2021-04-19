const request = require('supertest');
const { when, resetAllWhenMocks } = require('jest-when');
const { sequelize, Times } = require('../../src/models');
const app = require('../../src/app');

describe('GET /health_check', () => {
  it('should return OK 200', () => {
    return request(app).get('/health_check').expect(200);
  });
});

describe('POST /register_time', () => {
  // Mock model method
  const spiedCreate = jest.spyOn(Times, 'create');

  // Close db conection after running all the tests
  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(() => {
    resetAllWhenMocks();
  });

  describe('Validate request body', () => {
    it('should return BAD REQUEST 400 when required data is missing', (done) => {
      const testCases = [null, {}, { milliseconds: null }, { seconds: null }];

      testCases.forEach((testCase) => {
        request(app)
          .post('/register_time')
          .send(testCase)
          .then((res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error');
            expect(res.body).toHaveProperty('message');
            expect(res.body.error).toContain('Invalid data in');
          });
      });

      expect(spiedCreate.mock.calls.length).toBe(0);
      done();
    });

    it('should return BAD REQUEST 400 when both exclusive fields are provided', (done) => {
      const testCases = [
        { seconds: 20, milliseconds: null },
        { milliseconds: 20000, seconds: null },
        { milliseconds: 20000, seconds: 20 },
      ];

      testCases.forEach((testCase) => {
        request(app)
          .post('/register_time')
          .send(testCase)
          .then((res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error');
            expect(res.body).toHaveProperty('message');
            expect(res.body.error).toContain('Invalid data in');
          });
      });

      expect(spiedCreate.mock.calls.length).toBe(0);
      done();
    });

    it('should return BAD REQUEST 400 when the milliseconds field is invalid', (done) => {
      // It shouldn't be negative, decimal nor bigger than 2147483647
      const testCases = [
        { milliseconds: -1000 },
        { milliseconds: 456.789 },
        { milliseconds: 2147483648 },
      ];

      testCases.forEach((testCase) => {
        request(app)
          .post('/register_time')
          .send(testCase)
          .then((res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error');
            expect(res.body).toHaveProperty('message');
            expect(res.body.error).toContain('Invalid data in');
          });
      });

      expect(spiedCreate.mock.calls.length).toBe(0);
      done();
    });

    it('should return BAD REQUEST 400 when the seconds field is invalid', (done) => {
      // It shouldn't be negative, decimal nor bigger than 2147483647
      const testCases = [
        { seconds: -1000 },
        { seconds: 456.789 },
        { seconds: 2147483648 },
      ];

      testCases.forEach((testCase) => {
        request(app)
          .post('/register_time')
          .send(testCase)
          .then((res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error');
            expect(res.body).toHaveProperty('message');
            expect(res.body.error).toContain('Invalid data in');
          });
      });

      expect(spiedCreate.mock.calls.length).toBe(0);
      done();
    });
  });

  describe('Handle internal errors', () => {
    it('should return 500 INTERNAL SERVER ERROR when resource creation fails', () => {
      const newTime = { milliseconds: 5000 };
      const errorMessage = 'Unexpected Error';

      when(spiedCreate)
        .calledWith(expect.anything())
        // All Sequelize error inherits from the base JS Error class
        .mockRejectedValueOnce(new Error(errorMessage));

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
        });
    });
  });

  describe('Insert new data when success', () => {
    describe('Milliseconds', () => {
      const testCases = [
        [
          { milliseconds: 90000 },
          {
            uuid: 'mock uuid',
            milliseconds: 90000,
            updatedAt: 'mock updated at',
            createdAt: 'mock created at',
          },
        ],
        [
          { milliseconds: 1234.0 },
          {
            uuid: 'mock uuid',
            milliseconds: 1234.0,
            updatedAt: 'mock updated at',
            createdAt: 'mock created at',
          },
        ],
        [
          { milliseconds: '98765' },
          {
            uuid: 'mock uuid',
            milliseconds: 98765,
            updatedAt: 'mock updated at',
            createdAt: 'mock created at',
          },
        ],
      ];

      it.concurrent.each(testCases)(
        'should return OK 201 with new item created for (%o)',
        async (newTime, expectedResponse) => {
          return request(app)
            .post('/register_time')
            .send(newTime)
            .expect((res) => {
              // Override some unpredictable response elements before evaluating
              // the final response
              res.body.uuid = expectedResponse.uuid;
              res.body.updatedAt = expectedResponse.updatedAt;
              res.body.createdAt = expectedResponse.createdAt;
            })
            .expect(201, expectedResponse)
            .then(async (_) => {
              // TODO: couldn't get calls from spied create()
              // expect(spiedCreate).toHaveBeenCalledTimes(1);
              // expect(spiedCreate.mock.calls[0][0]).toStrictEqual(
              //   expectedResponse.milliseconds
              // );
              const storedTime = await Times.findOne({ where: newTime });
              expect(storedTime.milliseconds).toBe(
                expectedResponse.milliseconds
              );
            });
        }
      );
    });

    describe('Seconds', () => {
      const testCases = [
        [
          { seconds: 90 },
          {
            uuid: 'mock uuid',
            seconds: 90,
            updatedAt: 'mock updated at',
            createdAt: 'mock created at',
          },
        ],
        [
          { seconds: 12.0 },
          {
            uuid: 'mock uuid',
            seconds: 12.0,
            updatedAt: 'mock updated at',
            createdAt: 'mock created at',
          },
        ],
        [
          { seconds: '987' },
          {
            uuid: 'mock uuid',
            seconds: 987,
            updatedAt: 'mock updated at',
            createdAt: 'mock created at',
          },
        ],
      ];

      it.concurrent.each(testCases)(
        'should return OK 201 with new item created for (%o)',
        async (newTime, expectedResponse) => {
          return request(app)
            .post('/register_time')
            .send(newTime)
            .expect((res) => {
              // Override some unpredictable response elements before evaluating
              // the final response
              res.body.uuid = expectedResponse.uuid;
              res.body.updatedAt = expectedResponse.updatedAt;
              res.body.createdAt = expectedResponse.createdAt;
            })
            .expect(201, expectedResponse)
            .then(async (_) => {
              // TODO: couldn't get calls from spied create()
              // expect(spiedCreate).toHaveBeenCalledTimes(1);
              // expect(spiedCreate.mock.calls[0][0].seconds).toStrictEqual(
              //   expectedResponse.seconds
              // );
              const storedTime = await Times.findOne({ where: newTime });
              expect(storedTime.seconds).toBe(expectedResponse.seconds);
            });
        }
      );
    });
  });
});
