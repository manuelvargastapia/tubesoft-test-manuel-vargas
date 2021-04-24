export class UnexpectedError {
  constructor(message) {
    this.title = 'Unexpected error';
    this.message = message;
  }
}

export class ServerError {
  constructor(message) {
    this.title = 'Server error';
    this.message = message;
  }
}
