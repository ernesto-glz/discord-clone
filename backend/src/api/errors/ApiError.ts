export class ApiError extends Error {
  readonly code: number;
  readonly isOperational: boolean;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
