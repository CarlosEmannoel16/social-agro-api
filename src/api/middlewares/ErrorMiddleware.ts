import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { MiddlewareInterface } from "@/_shared/interfaces/MiddlewareInterface";
export class ErrorMiddleware {
  constructor() {}

  async execute(
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error) {
      console.error(error);
    }

  }
}
