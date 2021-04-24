export class UnexpectedError extends Error {
  constructor(message) {
    super(message);
  }
}

export class ServerError extends Error {
  constructor(message) {
    super(message);
  }
}
