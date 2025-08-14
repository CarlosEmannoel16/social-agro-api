import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export interface MiddlewareInterface {
  execute(
    request: Request,
    response: Response,
    error: ErrorRequestHandler,
    next: NextFunction
  ): Promise<any>;
}
