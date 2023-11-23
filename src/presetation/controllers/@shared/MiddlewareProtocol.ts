import { NextFunction, Request, Response } from "express";

export interface MiddlewareProtocol {
  execute(request: Request, response: Response, next: NextFunction): Promise<any>;
}
