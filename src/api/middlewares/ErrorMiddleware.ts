import { ErrorRequestHandler } from 'express';
export class ErrorMiddleware {
  async execute(error: ErrorRequestHandler) {
    if (error) {
      console.error(error);
    }
  }
} 
