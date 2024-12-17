import { MiddlewareInterface } from "@/_shared/interfaces/MiddlewareInterface";
import { NextFunction, Request, Response } from "express";

export const middlewareAdapter = (middleware: MiddlewareInterface) => {
  return async (req: Request, res: Response, next: NextFunction) =>
    middleware.execute(req, res, next);
};
