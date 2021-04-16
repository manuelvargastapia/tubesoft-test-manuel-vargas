const request = require("supertest");

const app = require("./app");

describe("health_check", () => {
  test("It should return OK 200", () => {
    return request(app).get("/health_check").expect(200);
  });
});
