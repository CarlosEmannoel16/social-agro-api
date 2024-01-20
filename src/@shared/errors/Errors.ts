export class ValidationError extends Error {
  constructor(message?: string) {
    super(`ERROR VALIDATION: ${message}`);
    this.name = "ValidationError";
  }
}

export class ServerError extends Error {
  constructor(message?: string) {
    super(`ERROR SERVER: ${message}`);
    this.name = "ServerError";
  }
}
